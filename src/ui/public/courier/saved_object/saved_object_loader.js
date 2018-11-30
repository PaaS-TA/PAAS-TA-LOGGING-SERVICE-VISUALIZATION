import _ from 'lodash';
import Scanner from 'ui/utils/scanner';
import { StringUtils } from 'ui/utils/string_utils';

// REX
let spaceGuid = '';
let visualizationList = [];

export class SavedObjectLoader {
  constructor(SavedObjectClass, kbnIndex, esAdmin, kbnUrl, $http) {
    this.type = SavedObjectClass.type;
    this.Class = SavedObjectClass;
    this.lowercaseType = this.type.toLowerCase();
    this.kbnIndex = kbnIndex;
    this.kbnUrl = kbnUrl;
    this.esAdmin = esAdmin;

    this.scanner = new Scanner(esAdmin, {
      index: kbnIndex,
      type: this.lowercaseType
    });

    this.loaderProperties = {
      name: `${ this.lowercaseType }s`,
      noun: StringUtils.upperFirst(this.type),
      nouns: `${ this.lowercaseType }s`,
    };

    // REX
    $http
        .get('/api/laas/session?name=CF_SPACE_GUID')
        .then(function (result) {
            // Apply index prefix property
            spaceGuid = `${result.data.indexPattern}${result.data.spaceGuid}-*`;
        });
  }

  /**
   * Retrieve a saved object by id. Returns a promise that completes when the object finishes
   * initializing.
   * @param id
   * @returns {Promise<SavedObject>}
   */
  get(id) {
    return (new this.Class(id)).init();
  }

  urlFor(id) {
    return this.kbnUrl.eval(`#/${ this.lowercaseType }/{{id}}`, { id: id });
  }

  delete(ids) {
    ids = !_.isArray(ids) ? [ids] : ids;

    const deletions = ids.map(id => {
      const savedObject = new this.Class(id);
      return savedObject.delete();
    });

    return Promise.all(deletions);
  }

  /**
   * Updates hit._source to contain an id and url field, and returns the updated
   * source object.
   * @param hit
   * @returns {hit._source} The modified hit._source object, with an id and url field.
   */
  mapHits(hit) {
    const source = hit._source;
    source.id = hit._id;
    source.url = this.urlFor(hit._id);
    return source;
  }

  scanAll(queryString, pageSize = 1000) {
    return this.scanner.scanAndMap(queryString, {
      pageSize,
      docCount: Infinity
    }, (hit) => this.mapHits(hit));
  }

  /**
   * TODO: Rather than use a hardcoded limit, implement pagination. See
   * https://github.com/elastic/kibana/issues/8044 for reference.
   *
   * @param searchString
   * @param size
   * @returns {Promise}
   */
  find(searchString, size = 100) {
    let body;
    if (searchString) {
      body = {
        query: {
          simple_query_string: {
            query: searchString + '*',
            fields: ['title^3', 'description'],
            default_operator: 'AND'
          }
        }
      };
    } else {
      body = { query: { match_all: {} } };
    }

    return this.esAdmin.search({
      index: this.kbnIndex,
      type: this.lowercaseType,
      body,
      size
    })
      .then((resp) => {
          // REX
          let savedObjectList = resp.hits.hits;
          let checkVisualization = false;
          let resultList = [];
          let savedObjectMeta;

          savedObjectList.forEach(function (e) {
              savedObjectMeta = e._source.kibanaSavedObjectMeta.searchSourceJSON;
              savedObjectMeta = JSON.parse(savedObjectMeta);

              let checkDashboard = false;
              let type = e._type;

              // CHECK VISUALIZATION AND SPACE GUID
              if (type === 'visualization' && savedObjectMeta.index === spaceGuid) {
                  checkVisualization = true;
                  resultList.push(e);
              }

              // CHECK DASHBOARD
              if (type === 'dashboard') {
                  let dashboardPanelList = JSON.parse(e._source.panelsJSON);
                  dashboardPanelList.forEach(function (e1) {
                      visualizationList.forEach(function (e2) {
                          // CHECK DASHBOARD PANEL AND SPACE GUID
                          if (e1.id === e2._id) {
                              checkDashboard = true;
                          }
                      });
                  });

                  if (checkDashboard) {
                      resultList.push(e);
                  }
              }

              // CHECK SEARCH AND SPACE GUID
              if (type === 'search' && savedObjectMeta.index === spaceGuid) {
                  resultList.push(e);
              }
          });


          if (checkVisualization) {
              visualizationList = resultList;
          }

        return {
          // REX
          total: resultList.length,
          hits: resultList.map((hit) => this.mapHits(hit))
        };
      });
  }
}
