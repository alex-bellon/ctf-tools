webpackJsonp([24],{

/***/ 1079:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(_) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Request; });
/* unused harmony export Response */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__RequestBody__ = __webpack_require__(2107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_util__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_httpheaders__ = __webpack_require__(612);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_ModelToSdkTransformer__ = __webpack_require__(479);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_services_filesystem__ = __webpack_require__(440);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_postman_collection_transformer__ = __webpack_require__(250);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_postman_collection_transformer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_postman_collection_transformer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__controllers_RuntimeBridge__ = __webpack_require__(644);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_http_reasons__ = __webpack_require__(606);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_http_reasons___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_http_reasons__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__modules_pipelines_user_action__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__modules_model_event__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__modules_services_HistoryService__ = __webpack_require__(535);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__stores_get_store__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__utils_ResolveVariableHelper__ = __webpack_require__(637);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__modules_controllers_CollectionController__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__modules_controllers_EnvironmentController__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__modules_controllers_GlobalsController__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__utils_vkbeautify__ = __webpack_require__(610);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_backbone__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_backbone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_17_backbone__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__modules_services_VariableSessionService__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__utils_VariableSessionHelper__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__utils_RequestUtil__ = __webpack_require__(399);
var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};





















var sdk = __webpack_require__(65),
VariableScope = sdk.VariableScope;

const DEPRECATED_PROPS = [
'currentHelper',
'helperAttributes',
'tests',
'preRequestScript'];


/**
                      * Backbone model of a request
                      * @todo Incomplete
                      *
                      * @class Request
                      * @augments {Backbone.Model}
                      */

/**
                          * JSON representation of a single request
                          * @todo Documentation Incomplete
                          *
                          * @typedef {Object} Request~definition
                          *
                          * {UUID} collectionId         -
                          * {Object} data               -
                          * {String} dataMode           -
                          * {String} description        -
                          * {Object[]} headers          -
                          * {Object} headerData         -
                          * {UUID} id                   -
                          * {String} method             -
                          * {String} name               -
                          * {Object[]} pathVariableData -
                          * {Response[]} responses      -
                          * {Timestamp} time            -
                          * {String} url                -
                          * {Object[]} queryParams      -
                          */

/**
                              * JSON representation of a response
                              *
                              * @todo Documentation Incomplete
                              *
                              * @typedef {Object} {Response~definition}
                              */
var Request = __WEBPACK_IMPORTED_MODULE_17_backbone___default.a.Model.extend( /** @lends Request.prototype */{
  defaults: function () {
    return {
      id: __WEBPACK_IMPORTED_MODULE_1__utils_util__["a" /* default */].guid(),
      url: '',
      pathVariableData: [],
      queryParams: [],
      systemQueryParams: [],
      name: '',
      description: '',
      bodyParams: {},
      systemHeaders: [],
      headerData: [],
      method: 'GET',
      dataMode: 'params',
      transformedUrl: '',
      isFromCollection: false,
      editorMode: 0,
      responses: [],
      body: new __WEBPACK_IMPORTED_MODULE_0__RequestBody__["a" /* default */](),
      response: new Response(),
      auth: null,
      data: null,
      events: [],
      testResults: null,
      testErrors: null,
      selectedHelper: null,
      write: true,
      lifecycle: 'idle' };

  },

  // Fixed
  initialize: function (args) {
    this.on('cancelRequest', this.onCancelRequest, this);

    if (!pm.hasRequestInitializedOnce) {
      pm.hasRequestInitializedOnce = true;
    }

    this.populateBody();
    this.mergeHeaderData();
    this.mergeQueryParamsData();
    this.unsetDeprecatedProps();
  },

  unsetDeprecatedProps() {
    _.forEach(DEPRECATED_PROPS, attribute => {this.unset(attribute, { silent: true });});
  },

  getVariablesMap() {
    let environmentId = Object(__WEBPACK_IMPORTED_MODULE_11__stores_get_store__["a" /* getStore */])('ActiveEnvironmentStore').id,
    globalsId = Object(__WEBPACK_IMPORTED_MODULE_11__stores_get_store__["a" /* getStore */])('ActiveGlobalsStore').id,
    workspaceId = Object(__WEBPACK_IMPORTED_MODULE_11__stores_get_store__["a" /* getStore */])('ActiveWorkspaceStore').id;

    return Object(__WEBPACK_IMPORTED_MODULE_18__modules_services_VariableSessionService__["e" /* getVariableSessionMap */])({ environmentId, globalsId, workspaceId });
  },

  mergeHeaderData: function () {
    this.set('headerData', this.getHeaderData());
  },

  mergeQueryParamsData: function () {
    this.set('queryParams', __WEBPACK_IMPORTED_MODULE_1__utils_util__["a" /* default */].getUrlVarsWithDescription(this.get('url'), this.get('queryParams')));
  },

  populateBody: function () {
    this.get('body').set({
      data: this.get('data'),
      dataMode: this.get('dataMode'),
      editorMode: this.get('editorMode') });

  },

  trimUrl: function () {
    var url = this.get('url');
    if (url) {
      var newUrl = _.trim(url);
      if (newUrl !== url) {
        this.set('url', newUrl);
      }
    }
  },

  onCancelRequest: function () {
    var aborter = this.get('runtimeRequestAborter'),
    runLinkID = this.get('runLinkID');

    if (runLinkID) {
      __WEBPACK_IMPORTED_MODULE_6__controllers_RuntimeBridge__["a" /* default */].stopRunRequest(runLinkID);
    }

    if (aborter) {
      pm.console.netErr(aborter.httpRequestId, 'cancelled');
    }

    this.cancel();
  },

  downloadResponseData: function (request) {
    let response = request.get('response'),
    action = request.get('action'),
    previewType = response.get('previewType'),
    type = '';

    if (action === 'download') {
      Object(__WEBPACK_IMPORTED_MODULE_4__models_services_filesystem__["c" /* saveAndOpenFileForResponse */])('response', response.get('sdkResponse'), type, function (error) {
        if (!error) {
          pm.toasts.success('Saved');
        }
      });
    }
  },

  packHeaders: function (headers) {
    let paramString = '';

    _.forEach(headers, header => {
      let prefix = '';

      if (header.enabled === false) {
        prefix = '//';
      }

      let key = header.name || header.key || '';
      if (key !== '') {
        paramString += prefix + key + ': ' + header.value + '\n';
      }
    });

    return paramString;
  },

  getHeaderValue: function (key) {
    var headers = this.get('headerData');

    key = key.toLowerCase();
    for (var i = 0, count = _.size(headers); i < count; i++) {
      if (!headers[i]) {
        continue;
      }
      var headerKey = headers[i].key ? headers[i].key.toLowerCase() : '';

      if (headerKey === key) {
        return headers[i].value;
      }
    }

    return false;
  },

  getHeaderData: function () {
    return _.map(this.get('headerData'), headerDatum => {
      return _.pick(headerDatum, ['key', 'value', 'description', 'enabled']);
    });
  },

  setUrlParamStringWithOptBlankValRemoval: function (params, silent, removeBlankParams, url) {
    if (!url) {
      url = this.get('url');
    }
    var paramArr = [];

    var existingUrlParams = {};
    if (url.split('?').length > 1) {
      _.each(url.split('?')[1].split('&'), function (param) {
        existingUrlParams[param.split('=')[0]] = param;
      });
    }
    var filteredParams = _.filter(params, param => {return param.enabled != false;});
    for (var i = 0; i < filteredParams.length; i++) {
      var p = filteredParams[i];
      if (p.key && p.key !== '' && typeof p.key === 'string') {
        p.key = p.key.replace(/&/g, '%26');
        if (!p.value) {
          p.value = '';
        }
        p.value = String(p.value);
        p.value = p.value.replace(/&/g, '%26');
        if (!removeBlankParams || p.value !== '') {
          var equals = p.value.length === 0 ? '' : '=';
          if (_.keys(existingUrlParams).indexOf(p.key) !== -1 && existingUrlParams[p.key].indexOf('=') !== -1) {
            equals = '=';
          }
          paramArr.push(p.key + equals + p.value);
        }
      }
    }

    var baseUrl = url.split('?')[0];
    if (paramArr.length > 0) {
      url = baseUrl + '?' + paramArr.join('&');
    } else
    {
      // Has key/val pair
      // removed this check due to GH-2136
      // if (url.indexOf("?") > 0 && url.indexOf("=") > 0) {
      url = baseUrl;

      // }
    }

    if (silent) {
      this.set('url', url, { 'silent': true });
    } else
    {
      this.set('url', url);
    }

  },

  setUrlParamString: function (params, silent, url) {
    this.setUrlParamStringWithOptBlankValRemoval(params, silent, false, url);
  },

  encodeUrl: function (url) {
    var quesLocation = url.indexOf('?');

    if (quesLocation > 0) {
      var urlVars = __WEBPACK_IMPORTED_MODULE_1__utils_util__["a" /* default */].getUrlVars(url);
      var baseUrl = url.substring(0, quesLocation);
      var urlVarsCount = urlVars.length;
      var newUrl = baseUrl + '?';
      for (var i = 0; i < urlVarsCount; i++) {
        newUrl += urlVars[i].key + '=' + urlVars[i].value + '&';
      }

      newUrl = newUrl.substr(0, newUrl.length - 1);
      return url;
    } else
    {
      return url;
    }
  },

  getFinalRequestUrl: async function (url) {
    var finalUrl;

    finalUrl = __WEBPACK_IMPORTED_MODULE_1__utils_util__["a" /* default */].replaceURLPathVariables(url, this.get('pathVariableData'));
    finalUrl = this.encodeUrl(finalUrl);
    finalUrl = __WEBPACK_IMPORTED_MODULE_12__utils_ResolveVariableHelper__["a" /* default */].resolve(finalUrl, (await this.getVariablesMap()));
    finalUrl = __WEBPACK_IMPORTED_MODULE_1__utils_util__["a" /* default */].ensureProperUrl(finalUrl);

    return _.trim(finalUrl);
  },

  splitUrlIntoHostAndPath: function (url) {
    var path = '';
    var host;

    var parts = url.split('/');
    host = parts[2];
    var prefix = parts[0] + '/' + parts[1] + '/';
    var partsCount = parts.length;
    for (var i = 3; i < partsCount; i++) {
      path += '/' + parts[i];
    }

    var quesLocation = path.indexOf('?');
    var hasParams = quesLocation >= 0;

    if (hasParams) {
      parts = __WEBPACK_IMPORTED_MODULE_1__utils_util__["a" /* default */].getUrlVars(path);
      var count = parts.length;
      var encodedPath = path.substr(0, quesLocation + 1);
      for (var j = 0; j < count; j++) {
        var value = parts[j].value;
        var key = parts[j].key;

        //				value = encodeURIComponent(value);
        //				key = encodeURIComponent(key);
        var equals = parts[j].equals ? '=' : '';
        encodedPath += key + equals + value + '&';
      }

      // only do this to remove the trailing '&' if params are present
      if (count > 0) {
        encodedPath = encodedPath.substr(0, encodedPath.length - 1);
      }

      path = encodedPath;
    }

    return {
      host: host,
      path: path,
      prefix: prefix };

  },

  getAsObject: function () {
    var body = this.get('body');
    var request = {
      name: this.get('name'),
      description: this.get('description'),
      url: this.get('url'),
      queryParams: this.get('queryParams'),
      pathVariableData: this.get('pathVariableData'),
      data: body.get('data'),
      events: this.get('events'),
      auth: this.get('auth'),
      headerData: this.getHeaderData(),
      dataMode: body.get('dataMode'),
      method: this.get('method'),
      isFromCollection: this.get('isFromCollection'),
      write: this.isWriteable(),
      version: 2 };


    if (request.isFromCollection) {
      request.id = this.get('id');
      request.collectionId = this.attributes.collectionId;
      request.collection = this.attributes.collectionId;
    }

    return request;
  },

  isWriteable: function () {
    if (!this.get('collectionId')) {
      return true;
    }

    let collectionId = this.get('collectionId'),
    collectionStore = Object(__WEBPACK_IMPORTED_MODULE_11__stores_get_store__["a" /* getStore */])('CollectionStore').find(collectionId);
    if (!collectionStore) {
      return true;
    }

    return collectionStore.isEditable;
  },

  saveRequest: function (opts = {}) {
    this.trigger('beforeSave');
    var requestId = this.get('id');
    if (!requestId || this.isWriteable() === false || !this.get('collection')) {
      pm.mediator.trigger('showAddToCollectionModal', this, opts);
      return false;
    }

    if (requestId && !Object(__WEBPACK_IMPORTED_MODULE_11__stores_get_store__["a" /* getStore */])('RequestStore').find(requestId)) {
      console.warn('Request not found', requestId);
      pm.mediator.trigger('showAddToCollectionModal', this, opts);
      return false;
    }

    if (pm.tabManager && !opts.skipConflictModal) {
      const currentTabId = pm.tabManager.getCurrentTab().get('id');
      if (pm.tabManager.isTabRequestUpdated(requestId, currentTabId)) {
        pm.tabManager.trigger('showConflictTabModal', currentTabId, pm.tabManager.getUpdatedTabRequest(requestId));
        return false;
      }
    }

    var collectionRequest = {
      id: this.get('id'),
      headerData: this.getHeaderData(),
      url: this.get('url'),
      name: this.get('name'),
      collection: this.get('collection'),
      folder: this.get('folder'),
      queryParams: this.get('queryParams'),
      events: this.get('events'),
      pathVariableData: this.get('pathVariableData'),
      method: this.get('method'),
      data: this.get('body').get('data'),
      dataMode: this.get('body').get('dataMode'),
      version: this.get('version'),
      auth: this.get('auth') || null,
      time: new Date().getTime() };


    let updateRequestEvent = {
      name: 'update',
      namespace: 'request',
      data: _extends({}, collectionRequest) };


    Object(__WEBPACK_IMPORTED_MODULE_8__modules_pipelines_user_action__["a" /* default */])(updateRequestEvent).
    then(response => {
      if (!_.isEmpty(_.get(response, 'error'))) {
        console.error('Error in updating request', response.error);
        return;
      }
      this.trigger('saved');
    }).
    catch(err => {
      console.error('Error in pipeline while updating request', err);
    });

    return true;
  },


  cancel: function () {
    var response = this.get('response');
    response.clear();
    this.set('lifecycle', 'idle');
  },

  deleteSampleResponse: function (id) {
    let deleteResponseEvent = {
      name: 'delete',
      namespace: 'response',
      data: { id } };



    Object(__WEBPACK_IMPORTED_MODULE_8__modules_pipelines_user_action__["a" /* default */])(deleteResponseEvent).
    then(response => {
      if (!_.isEmpty(_.get(response, 'error'))) {
        console.error('Error in deleting response', response.error);
        return;
      }

      let responseList = _.clone(this.get('responses')) || [];
      let isFoundAtIndex = _.findIndex(responseList, ['id', id]);
      isFoundAtIndex >= 0 && responseList.splice(isFoundAtIndex, 1);
      this.set('responses', responseList);

      // @todo find a way to update the request in tab
      // One way is take it from store directly.
    }).
    catch(err => {
      console.error('Error in pipeline for deleting response', err);
    });
  },

  loadSampleResponseById: function (responseId) {
    var responses = this.get('responses');
    var response = _.find(responses, ['id', responseId]);
    if (!response) {
      return;
    }
    this.loadSampleResponse(response);
  },

  loadSampleResponse: async function (response) {
    pm.tabManager.getCurrentTab().setOriginalRequestState();
    var responseRequest = __WEBPACK_IMPORTED_MODULE_1__utils_util__["a" /* default */].getExampleRequestObject(response);

    if (_.isEmpty(responseRequest)) {
      responseRequest = await __WEBPACK_IMPORTED_MODULE_13__modules_controllers_CollectionController__["a" /* default */].getRequest({ id: this.get('id') });
    }
    if (_.isEmpty(responseRequest)) {
      pm.toasts.error('Something went wrong while opening this example response');
      return;
    }
    this.set('url', responseRequest.url);
    this.set('method', responseRequest.method);

    // This should trigger change events in Backbone
    this.set('data', responseRequest.data);
    this.set('dataMode', responseRequest.dataMode);
    this.set('headerData', responseRequest.headerData);
    this.set('queryParams', __WEBPACK_IMPORTED_MODULE_1__utils_util__["a" /* default */].getUrlVarsWithDescription(this.get('url'), responseRequest.queryParams));
    this.set('pathVariableData', responseRequest.pathVariableData);
    var body = this.get('body');

    if (__WEBPACK_IMPORTED_MODULE_1__utils_util__["a" /* default */].isMethodWithBody(responseRequest.method)) {
      body.set('dataMode', responseRequest.dataMode);
      body.loadData(responseRequest.dataMode, responseRequest.data, true);
    }

    this.trigger('loadRequest', this);
    var r = this.get('response');
    r.loadSampleResponse(this, response);
    pm.tabManager.getCurrentTab().setInitialExample(this, r);
    this.set('lifecycle', 'completed');
    pm.mediator.trigger('lifecycle:completed');
    this.set('response', r);
    this.trigger('responseChanged');
  },

  loadRequestInExample: function () {
    pm.tabManager.getCurrentTab().setOriginalRequestState();
    var r = this.get('response');
    pm.tabManager.getCurrentTab().setInitialExample(this, r);
    this.set('lifecycle', 'completed');
    pm.mediator.trigger('lifecycle:completed');
    this.set('response', r);
  },


  loadRequest: function (request, isFromCollection, isFromSample, isFromTestRunner, isFromTab) {

    if (pm.tabManager) {
      pm.tabManager.disableDirtyCheck();
    }

    var body = this.get('body');
    var response = this.get('response');

    this.set('id', request.id);
    this.set('write', request.write);
    this.set('editorMode', 0);
    this.set('url', request.url);
    this.set('queryParams', request.queryParams);
    this.set('testResults', request.testResults);
    this.set('testErrors', request.testErrors);
    this.set('pathVariableData', request.pathVariableData);
    this.set('headerData', request.headerData);

    this.set('isFromCollection', isFromCollection);
    this.set('isFromSample', isFromSample);

    if (!request.method) {
      request.method = 'get';
    }
    this.set('method', request.method.toUpperCase());

    /* Set defaults for unsaved requests*/
    this.set('collectionId', null);
    this.set('responses', []);

    if (isFromCollection) {
      this.set('collectionId', request.collectionId);

      if (typeof request.name !== 'undefined') {
        this.set('name', request.name);
      } else
      {
        this.set('name', '');
      }

      if (typeof request.description !== 'undefined') {
        this.set('description', request.description);
      } else
      {
        this.set('description', '');
      }


      if ('responses' in request) {
        this.set('responses', request.responses);
        if (request.responses) {
        } else
        {
          this.set('responses', []);
        }
      } else
      {
        this.set('responses', []);
      }
    } else
    if (isFromSample) {
    } else
    {
      this.set('name', '');
    }

    if (!isFromTab || pm.testRunner) {
      this.set('testResults', null);
    }

    response.clear();

    if (__WEBPACK_IMPORTED_MODULE_1__utils_util__["a" /* default */].isMethodWithBody(this.get('method'))) {
      body.set('dataMode', request.dataMode);

      var dataAsArray = true;
      if (typeof request.data === 'string') {
        dataAsArray = false;
      }
      if (request.dataMode === 'raw') {
        if (request.hasOwnProperty('rawModeData') && _.isArray(request.data)) {
          request.data = request.rawModeData; // to accept older collections with rawModeData :s
        }
      }
      body.loadData(request.dataMode, request.data, dataAsArray);
    } else
    {
      if ('version' in request) {
        if (request.version === 2) {
          body.loadData('raw', '', true);
        } else
        {
          body.loadData('raw', '', false);
        }
      } else
      {
        body.loadData('raw', '', false);
      }
      body.set('dataMode', 'params');
    }

    response.trigger('clearResponse');
    this.trigger('loadRequest', this);
  },

  loadRequestFromLink: function (link) {
    let request = new Request();
    request.set('url', link);
    request.set('method', 'GET');
    request.set('isFromCollection', false);
    if (pm.settings.getSetting('retainLinkHeaders') === true) {
      let headers = this.get('headerData');
      if (headers) {
        request.set('headerData', headers);
      }
    }

    pm.mediator.trigger('loadRequestInNewTab', request.toJSON());
  },

  prepareForSending: function () {
    let response = this.get('response');
    response && response.set('__id', __WEBPACK_IMPORTED_MODULE_1__utils_util__["a" /* default */].guid());
  },

  clearSystemParams: function () {
    this.set({
      systemHeaders: [],
      systemQueryParams: [] });


    this.get('body') && this.get('body').set('systemBodyParams', {});
  },

  setHeaderInArray: function (headers, key, value) {
    var contentTypeHeaderKey = key;
    var pos = __WEBPACK_IMPORTED_MODULE_1__utils_util__["a" /* default */].findPositionCaseInsensitive(headers, 'key', contentTypeHeaderKey);

    if (value === 'text') {
      if (pos >= 0) {
        headers.splice(pos, 1);
      }
    } else
    if (pos >= 0) {
      headers[pos] = {
        key: contentTypeHeaderKey,
        type: 'text',
        name: contentTypeHeaderKey,
        value: value };

    } else
    {
      headers.push({
        key: contentTypeHeaderKey,
        name: contentTypeHeaderKey,
        value: value });

    }

    return headers;
  },

  setHeader: function (key, value) {
    var headers = _.clone(this.get('headerData')),
    originalDescription = '';

    if (!(headers instanceof Array)) {
      headers = [];
    }

    var contentTypeHeaderKey = key;
    var pos = __WEBPACK_IMPORTED_MODULE_1__utils_util__["a" /* default */].findPositionCaseInsensitive(headers, 'key', contentTypeHeaderKey);

    if (pos >= 0) {
      originalDescription = headers[pos].description || '';
    }

    if (value === 'text') {
      if (pos >= 0) {
        headers.splice(pos, 1);
      }
    } else
    if (pos >= 0) {
      headers[pos] = {
        key: contentTypeHeaderKey,
        description: originalDescription,
        type: 'text',
        name: contentTypeHeaderKey,
        value: value };

    } else
    {
      headers.push({
        key: contentTypeHeaderKey,
        name: contentTypeHeaderKey,
        value: value });

    }

    this.set({ 'headerData': headers });
  },

  setSystemHeader: function (key, value) {
    this.set('systemHeaders', [
    ...this.get('systemHeaders'),
    {
      key: key,
      type: 'text',
      name: key,
      value: value }]);


  },

  getXhrHeaders: async function () {
    var body = this.get('body');

    var systemHeaders = _.clone(this.get('systemHeaders')) || [],
    headers = _.clone(this.get('headerData')) || [];

    // include system headers
    headers = _.concat(headers, systemHeaders);

    if (pm.settings.getSetting('sendNoCacheHeader') === true) {
      this.setHeaderInArray(headers, 'Cache-Control', 'no-cache');
    }

    if (pm.settings.getSetting('sendPostmanTokenHeader') === true) {
      this.setHeaderInArray(headers, 'Postman-Token', __WEBPACK_IMPORTED_MODULE_1__utils_util__["a" /* default */].guid());
    }

    if (__WEBPACK_IMPORTED_MODULE_1__utils_util__["a" /* default */].isMethodWithBody(this.get('method'))) {
      if (body.get('dataMode') === 'urlencoded') {
        // only add the content-type header if it doesn't already exist
        if (_.map(_.map(headers, 'name'), function (name) {
          if (name) {
            return name.toLowerCase();
          }
        }).indexOf('content-type') === -1) {
          this.setHeaderInArray(headers, 'Content-Type', 'application/x-www-form-urlencoded');
        }
      }
    }

    let i,
    variablesMap = await this.getVariablesMap(),
    finalHeaders = [];

    for (i = 0; i < headers.length; i++) {
      var header = _.clone(headers[i]);
      if (!_.isEmpty(header.value) && !_.isEmpty(header.key) && header.enabled !== false) {
        header.key = __WEBPACK_IMPORTED_MODULE_12__utils_ResolveVariableHelper__["a" /* default */].resolve(header.key, variablesMap);
        header.value = __WEBPACK_IMPORTED_MODULE_12__utils_ResolveVariableHelper__["a" /* default */].resolve(header.value, variablesMap);
        finalHeaders.push(header);
      }
    }

    this.set('transformedHeaders', finalHeaders);
    return finalHeaders;
  },

  // @TODO Not being used, remove this
  getRequestBodyForCurl: async function () {
    var body = this.get('body');
    return await body.getBodyForCurl();
  },

  getURLForSnippet: async function () {
    // unparse the URL
    let url = new sdk.Url(this.get('url'));

    // add system query parameters if present
    url.addQueryParams(this.get('systemQueryParams'));

    // compress url, resolve path variables and environment variables
    return await this.getFinalRequestUrl(url.toString());
  },

  getRequestAfterResolutionForSnippet: async function () {
    var ret = {},
    resolvedData = null;
    var oldVal = this.getAsObject();

    // getFinalRequestUrl replaces URL params
    ret.url = await this.getURLForSnippet();
    ret.headers = this.packHeaders((await this.getXhrHeaders()));

    // escape double quotes for certain lingos
    ret.headers = typeof ret.headers === 'string' ? ret.headers.replace(/\"/g, '\\\"') : ret.headers;

    try {
      let serializableData,
      variablesMap = await this.getVariablesMap();

      if (oldVal.dataMode === 'raw' || oldVal.dataMode === 'binary') {
        serializableData = oldVal.data;
        resolvedData = __WEBPACK_IMPORTED_MODULE_12__utils_ResolveVariableHelper__["a" /* default */].resolve(serializableData, variablesMap);
      } else
      {
        serializableData = _.map(oldVal.data, datum => {
          if (datum.type === 'file' && datum.value && !_.isEmpty(datum.value)) {
            return _extends({},
            datum, {
              value: _.get(datum, 'value[0].path', _.get(datum, 'value[0].name', '')) });

          } else
          {
            return datum;
          }
        });
        resolvedData = __WEBPACK_IMPORTED_MODULE_12__utils_ResolveVariableHelper__["a" /* default */].resolve(JSON.stringify(serializableData), variablesMap);
        resolvedData = JSON.parse(resolvedData);
      }
      !_.isEmpty(resolvedData) && (ret.data = resolvedData);
    }
    catch (err) {
      console.log('Error in processing request body', err);
    }
    ret.method = oldVal.method;
    ret.dataMode = oldVal.dataMode;
    return ret;
  },

  /**
      * Extracts body params added by runtime. Right now this only looks for params that could be added by Auth.
      *
      * @param PostmanRequest sdk request object
      *
      * @returns {Object[]}
      */
  extractSystemBodyParams: function (request) {
    // bail out
    if (!request || !_.includes(['formdata', 'urlencoded'], _.get(request, 'body.mode'))) {return {};}

    let bodyType = _.get(request, 'body.mode'),
    requestBodyParams = request.body.toJSON()[bodyType],
    systemBodyParams,
    sentParams;

    // this auth does not add any body params
    if (_.isEmpty(requestBodyParams)) {return {};}

    // filter params that were added by Auth
    return { [bodyType]: _.filter(requestBodyParams, requestBodyParam => {return Boolean(requestBodyParam.system);}) };
  },

  /**
      * getRequestAsV1
      * used to get the V1 format request object
      * http://schema.getpostman.com/json/collection/v1.0.0/docs/index.html
      * @param {Object} requestJSON the request json of the request model
      * @param {RequestModel} requestModel the request model from which the data needs to fetched
      * @returns {Object} Request v1 format object.
      */

  getRequestAsV1: function (requestModel) {
    if (!requestModel) {
      return {};
    }

    // Picking only the things needs for a request to be sent, since the app model layer has lots of stale and unwanted data
    let requestJSON = requestModel.toJSON(),
    requestV1 = _.pick(requestJSON, [
    'id',
    'name',
    'url',
    'method',
    'pathVariableData',
    'description',
    'events',
    'auth',
    'headers',
    'collectionId',
    'folder']);


    // Request data and headers needs to be sanitized before providing to the transformer
    requestModel.get('body') && __WEBPACK_IMPORTED_MODULE_1__utils_util__["a" /* default */].isMethodWithBody(requestV1.method) &&
    _.assign(requestV1, __WEBPACK_IMPORTED_MODULE_3__utils_ModelToSdkTransformer__["a" /* default */].getRequestData(requestModel.get('body').get('dataMode'), requestModel.get('body')));

    return requestV1;
  },

  send: async function (action) {
    if (_.isEmpty(this.get('url'))) {
      pm.toasts.error('Empty Request URL', { dedupeId: 'empty-request-url' });
      return;
    }

    this.set('action', action);

    // Some stuff that needs to be triggered.
    this.trigger('beforeSend');
    pm.mediator.trigger('request:send');

    var request = this,
    defaultHeaders = [],
    collection = null,
    requestJSON = request.toJSON(),
    collectionId = requestJSON.collectionId,
    collectionV1Model = null,
    collectionV1,
    store = Object(__WEBPACK_IMPORTED_MODULE_11__stores_get_store__["a" /* getStore */])('ActiveEnvironmentStore'),
    globalsStore = Object(__WEBPACK_IMPORTED_MODULE_11__stores_get_store__["a" /* getStore */])('ActiveGlobalsStore'),
    activeEnvironmentId = store && store.id,
    activeWorkspaceId = globalsStore && globalsStore.workspace,
    activeGlobalsId = globalsStore && globalsStore.id;

    if (request.get('isFromCollection')) {
      let dbRequest = await __WEBPACK_IMPORTED_MODULE_13__modules_controllers_CollectionController__["a" /* default */].getRequest({ id: request.id });

      // It is not a collection request, might be deleted or isFromCollection flag is wrongly set.
      if (!dbRequest) {
        request.set('isFromCollection', false);
      } else
      {
        // Always get the collection from the dbRequest.collection,
        // Since, the request may be moved out of a collection.
        collectionV1 = await __WEBPACK_IMPORTED_MODULE_13__modules_controllers_CollectionController__["a" /* default */].getCollection({ id: dbRequest.collection }, { populate: ['folders'] });
      }
    }

    // request might say it is from a collection, but the collection may not exit
    // collection may be deleted after request was opened in a tab
    if (collectionV1) {
      let requestToBeSent = this.getRequestAsV1(request);

      // Adding additional headers
      requestToBeSent.headers = __WEBPACK_IMPORTED_MODULE_3__utils_ModelToSdkTransformer__["a" /* default */].getHeaders(request, true);

      // handle variable-session
      if (!_.isEmpty(collectionV1.variables)) {
        let sessionId = Object(__WEBPACK_IMPORTED_MODULE_19__utils_VariableSessionHelper__["b" /* getSessionId */])('collection', collectionV1.id, activeWorkspaceId),
        variableSession = await Object(__WEBPACK_IMPORTED_MODULE_18__modules_services_VariableSessionService__["d" /* getSessionFor */])(sessionId, collectionV1);
        collectionV1.variables = _.reject(variableSession.values, { enabled: false });
      }

      /*
         *  We strip off all the requests and provide only the request that needs to sent in the collection
         *  By this way we are ensuring runtime, that we want to run only ONE REQUEST in the builder.
         */

      let minifiedCollection = _.assign({}, collectionV1, { requests: [requestToBeSent] });

      // @todo Remove the disabled variables, needs to be handled in runtime #RUNTIME-450
      // There is a case where the folders having an undefined value in its array. Hence we are compacting and sending out.
      _.assign(minifiedCollection, {
        variables: __WEBPACK_IMPORTED_MODULE_1__utils_util__["a" /* default */].getEnabledValues(minifiedCollection.variables),
        folders: _.compact(minifiedCollection.folders) });


      let collectionV2 = __WEBPACK_IMPORTED_MODULE_5_postman_collection_transformer___default.a.convert(
      minifiedCollection,
      {
        inputVersion: '1.0.0',
        outputVersion: '2.1.0',
        retainIds: true });


      collection = new sdk.Collection(collectionV2);
    } else
    {
      let item = {
        id: this.get('id'),
        name: this.get('name'),
        event: this.get('events'),
        request: __WEBPACK_IMPORTED_MODULE_3__utils_ModelToSdkTransformer__["a" /* default */].getRequest(request, { addDefaultHeaders: true }) };

      collection = new sdk.Collection();
      collection.items.add(item);
    }

    request.set({
      lifecycle: 'executingScripts',
      testErrors: null,
      testResults: null });


    let environment = activeEnvironmentId && (await __WEBPACK_IMPORTED_MODULE_14__modules_controllers_EnvironmentController__["a" /* default */].get({ id: activeEnvironmentId })),
    envSessionId = Object(__WEBPACK_IMPORTED_MODULE_19__utils_VariableSessionHelper__["b" /* getSessionId */])('environment', activeEnvironmentId, activeWorkspaceId),
    envSession = activeEnvironmentId && (await Object(__WEBPACK_IMPORTED_MODULE_18__modules_services_VariableSessionService__["d" /* getSessionFor */])(envSessionId, environment)),
    activeEnvSessionId = envSession && envSession.id,
    globals = activeWorkspaceId && (await __WEBPACK_IMPORTED_MODULE_15__modules_controllers_GlobalsController__["a" /* default */].get({ workspace: activeWorkspaceId })),
    globalsSessionId = globals && Object(__WEBPACK_IMPORTED_MODULE_19__utils_VariableSessionHelper__["b" /* getSessionId */])('globals', globals.id, activeWorkspaceId),
    globalSession = globals && (await Object(__WEBPACK_IMPORTED_MODULE_18__modules_services_VariableSessionService__["d" /* getSessionFor */])(globalsSessionId, globals)),
    activeGlobalSessionId = globalSession && globalSession.id;

    envSession = envSession ? _.reject(envSession.values, { enabled: false }) : environment && environment.values || [];
    globalSession = globalSession ? _.reject(globalSession.values, { enabled: false }) : globals && globals.values || [];

    this.prepareForSending();
    const showExceptionAlert = _.once(function () {
      pm.toasts.error('Something went wrong while running your scripts. Check Postman Console for more info.');
    });

    let runnerOptions = {
      run: {
        timeout: {
          global: 0, // infinity
          request: parseInt(pm.settings.getSetting('xhrTimeout')) || 0,

          // @todo: expose a setting to configure script timeout
          script: 0 // infinity
        },
        requester: {
          strictSSL: pm.settings.getSetting('SSLCertVerify'),
          followRedirects: pm.settings.getSetting('interceptorRedirect') } },


      host: {
        requires: ['lodash', 'crypto-all', 'tv4', 'xml2js', 'atob', 'btoa'],
        requirePath: '/js/libs/' // this is only used for the Browser sandbox. Ignored in case of Node sandbox.
      } };


    let runOptions = {
      environment: { values: envSession },
      globals: { values: globalSession },
      data: {},
      stopOnError: true,
      iterationCount: 1,
      disableSNR: true,
      useSystemProxy: pm.settings.getSetting('useSystemProxy'),
      proxies: pm.proxyListManager.globalProxies.toJSON() };


    let runMetaData = {
      certificates: __WEBPACK_IMPORTED_MODULE_3__utils_ModelToSdkTransformer__["a" /* default */].getClientSslCerts(pm.certificateManager),
      cookiePartitionId: __WEBPACK_IMPORTED_MODULE_1__utils_util__["a" /* default */].getCookiePartition() };


    let waitingForCookies = false;

    // @todo: get current workspace from VariableSessionController
    let currentWorkspace = Object(__WEBPACK_IMPORTED_MODULE_11__stores_get_store__["a" /* getStore */])('ActiveWorkspaceSessionStore').workspace;

    let runCallbacks = {
      console: pm.console.log.bind(pm.console),
      start: function (err) {
        // This place is too late to update the UI
        // request.set('lifecycle', 'executingScripts');
        // request.set('testErrors', null);
        // request.set('testResults', null);
      },

      io: function (err, cursor, trace, response, request) {
        let consolePayload = {},
        requestJSON;

        if (trace.type !== 'http' || !request) {
          return;
        }

        requestJSON = request.toJSON();

        consolePayload.request = {
          url: _.invoke(request, 'url.toString'),
          method: requestJSON.method,
          headers: _.invoke(request, 'headers.toObject'),
          body: requestJSON.body,
          certificate: requestJSON.certificate,
          proxy: requestJSON.proxy };


        if (response) {
          consolePayload.response = {
            responseTime: response.responseTime,
            code: response.code,
            headers: _.invoke(response, 'headers.toObject'),
            body: response.size().body / 1024 > 1024 ? 'Responses larger than 1MB are not shown' : response.text() };

        }

        if (err) {
          pm.console.netErr(cursor.httpRequestId, err.message, consolePayload);
        } else
        {
          pm.console.net(cursor.httpRequestId, consolePayload);
        }
      },

      exception: function (cursor, exception) {
        // This is a separate function so that multiple errors do not stack, and only once alert is shown per request.
        showExceptionAlert();
        pm.console.error('exception', { message: `${exception.name} | ${exception.message}` });
        console.warn(`Error running scripts: ${exception.name} | ${exception.message}`, exception);
      },

      beforePrerequest: function () {
        request.set('lifecycle', 'executingScripts');
        request.set('testResults', []);
      },
      prerequest: function (err, cursor, prResults, item) {
        if (!(_.isArray(prResults) && prResults.length)) {
          return;
        }

        var scriptError,
        modifiedEnvironment,
        modifiedGlobals,
        { error: errorObj } = _.find(prResults, prResult => prResult.error) || {};

        if (scriptError = err || errorObj) {
          request.trigger('prscriptError', scriptError.name + ': ' + scriptError.message);
          request.set('lifecycle', 'PRScriptError');

          return;
        }

        modifiedEnvironment = new VariableScope({ mutations: {} });
        modifiedGlobals = new VariableScope({ mutations: {} });

        _.forEach(prResults, result => {
          Object(__WEBPACK_IMPORTED_MODULE_20__utils_RequestUtil__["a" /* mergeMutations */])(modifiedEnvironment.mutations, _.get(result, 'result.environment.mutations'));
          Object(__WEBPACK_IMPORTED_MODULE_20__utils_RequestUtil__["a" /* mergeMutations */])(modifiedGlobals.mutations, _.get(result, 'result.globals.mutations'));
        });

        activeEnvironmentId && Object(__WEBPACK_IMPORTED_MODULE_18__modules_services_VariableSessionService__["f" /* updateEntityWithSession */])(activeEnvSessionId, modifiedEnvironment).
        catch(err => {
          console.warn('prerequest script: Error while getting environment session from db', err);
        });


        Object(__WEBPACK_IMPORTED_MODULE_18__modules_services_VariableSessionService__["f" /* updateEntityWithSession */])(activeGlobalSessionId, modifiedGlobals).
        catch(err => {
          console.warn('prerequest script: Error while getting globals session from db', err);
        });
      },
      beforeRequest: function (err, cursor, req, item, aborter) {
        const requestJson = req.toJSON(),
        requestUrl = req.url && req.url.toString(),
        requestUrlHost = req.url && req.url.getHost(),
        requestHeaders = req.headers.toObject();

        pm.console.net(cursor.httpRequestId, {
          request: {
            url: requestUrl,
            method: requestJson.method,
            headers: requestHeaders } });



        request.set('runtimeRequestAborter', aborter);
        request.set('transformedUrl', requestUrl);
        request.set('lifecycle', 'sending');

        // @todo: remove after runtime sets http request on aborter
        aborter.httpRequestId = cursor.httpRequestId;
      },
      response: function (err, cursor, responseObj, requestObj, item, cookies) {
        var systemQueryParams,
        systemBodyParams;

        // in some cases where request did not complete, runtime would not send a response argument
        responseObj = responseObj || new sdk.Response();

        // remove all existing system properties
        request.clearSystemParams();

        // Sync back the Auth params to headers, URL and body

        // headers
        _.each(requestObj.headers && requestObj.headers.toJSON(), function (header) {
          if (header.system === true) {
            request.setSystemHeader(header.key, header.value);
          }
        });

        // query params
        // extract
        systemQueryParams = _.filter(requestObj.url && requestObj.url.toJSON().query,
        function (queryParam) {return Boolean(queryParam.system);});

        // set
        systemQueryParams && request.set('systemQueryParams', systemQueryParams);

        // body
        // extract
        systemBodyParams = request.get('body') && request.extractSystemBodyParams(requestObj);

        // set
        systemBodyParams && request.get('body').set('systemBodyParams', systemBodyParams);

        if (err) {
          // this error automatically also passes to the done() callback, and is handled there.
          request.set('lifecycle', 'error');
          return;
        }

        var responseModel = request.get('response'),
        httpReason = __WEBPACK_IMPORTED_MODULE_7_http_reasons___default.a.lookup(responseObj.code),
        responseCode = {
          code: responseObj.code,
          name: responseObj.status || httpReason && httpReason.name,
          detail: httpReason && httpReason.detail },

        sortedHeaders,
        responseHeaders = responseObj.headers.toObject(),
        contentLength = parseInt(responseHeaders['content-length'], 10) || 0;

        request.set('lifecycle', 'receivedData');
        responseModel.set('time', responseObj.responseTime);
        responseModel.set('code', responseObj.code);
        responseModel.set('responseCode', responseCode);
        responseModel.set('text', responseObj.text());

        sortedHeaders = _.map(responseObj.headers.members, function (header) {
          var key = header.key.toLowerCase();

          return {
            key: header.key,
            value: header.value,
            name: header.key,
            description: __WEBPACK_IMPORTED_MODULE_2__utils_httpheaders__["b" /* headerDetails */][key] || 'Custom header' };

        });

        sortedHeaders = _.sortBy(sortedHeaders, 'key');
        responseModel.set('headers', sortedHeaders);
        responseModel.set('responseSize', _.clone(responseObj.size()));

        // Response body mime settings
        const mime = responseObj.mime();
        responseModel.set('mimeType', mime.type);
        responseModel.set('fileName', mime.filename || 'text');
        responseModel.set('previewType', mime.type || 'text');

        // Settings -> Language Detection
        const languageDetection = pm.settings.getSetting('languageDetection');
        if (languageDetection === 'JSON') {
          responseModel.set('language', 'json');
        } else
        {
          responseModel.set('language', mime.format || 'plain');
        }

        // Used only when downloading response through send and download
        responseModel.set('sdkResponse', responseObj);
        responseModel.set('dataURI', responseObj.dataURI());

        if (request.get('action') === 'download') {
          request.downloadResponseData(request);
        }
      },
      assertion: function (cursor, assertions) {
        let accumulatedAssertions = request.get('testResults') || [];

        request.set('testResults', _.concat(accumulatedAssertions, assertions));
      },
      beforeTest: function (err) {
        request.set('lifecycle', 'executingTests');
      },
      done: function (err, cursor) {
        if (err) {
          console.warn('There was a fatal error when sending the request!', err);
        }

        __WEBPACK_IMPORTED_MODULE_6__controllers_RuntimeBridge__["a" /* default */].disposeRun(request.get('runLinkID'));
        request.set('runLinkID', null);
      },
      test: function (err, cursor, testResults) {
        // Add request to the history
        __WEBPACK_IMPORTED_MODULE_10__modules_services_HistoryService__["a" /* default */].
        getHistoryFromRequest(request.serialize(), { workspace: currentWorkspace }).
        then(history => {
          let historyCreateEvent = Object(__WEBPACK_IMPORTED_MODULE_9__modules_model_event__["a" /* createEvent */])('create', 'history', history);

          Object(__WEBPACK_IMPORTED_MODULE_8__modules_pipelines_user_action__["a" /* default */])(historyCreateEvent).
          catch(e => {console.log('Error in creating history', e);});
        });

        // Check if there was a test script.. if no, there's nothing to do here.
        if (!(_.isArray(testResults) && testResults.length)) {
          request.set('lifecycle', 'completed');
          request.set('testErrors', null);
          request.set('testResults', null);
          return;
        }

        let scriptError,
        modifiedEnvironment,
        modifiedGlobals,
        { error: errorObj } = _.find(testResults, testResult => testResult.error) || {};

        if (scriptError = err || errorObj) {
          request.set('testResults', null);
          request.set('testErrors', scriptError.name + ': ' + scriptError.message);

          request.set('lifecycle', 'testScriptsError');
          return;
        }

        modifiedEnvironment = new VariableScope({ mutations: {} });
        modifiedGlobals = new VariableScope({ mutations: {} });

        _.forEach(testResults, result => {
          Object(__WEBPACK_IMPORTED_MODULE_20__utils_RequestUtil__["a" /* mergeMutations */])(modifiedEnvironment.mutations, _.get(result, 'result.environment.mutations'));
          Object(__WEBPACK_IMPORTED_MODULE_20__utils_RequestUtil__["a" /* mergeMutations */])(modifiedGlobals.mutations, _.get(result, 'result.globals.mutations'));
        });

        activeEnvironmentId && Object(__WEBPACK_IMPORTED_MODULE_18__modules_services_VariableSessionService__["f" /* updateEntityWithSession */])(activeEnvSessionId, modifiedEnvironment).
        catch(err => {
          console.warn('prerequest script: Error while getting environment session from db', err);
        });

        Object(__WEBPACK_IMPORTED_MODULE_18__modules_services_VariableSessionService__["f" /* updateEntityWithSession */])(activeGlobalSessionId, modifiedGlobals).
        catch(err => {
          console.warn('prerequest script: Error while getting globals session from db', err);
        });

        // Finish
        var thisResponse = request.get('response');
        thisResponse.trigger('sentRequest', request);
        request.trigger('sentRequest', request);
        waitingForCookies = true;
      },

      // custom callback - not part of runtime - to handle cookies.
      // @todo remove after adding a cookie store to runtime
      cookies(err, cookies) {
        if (_.isEmpty(err)) {
          request.get('response').set('cookies', cookies);
          pm.cookieManager.loadCookies();
          waitingForCookies && request.set('lifecycle', 'completed');
        }
      } };

    __WEBPACK_IMPORTED_MODULE_6__controllers_RuntimeBridge__["a" /* default */].startRun(runnerOptions, runOptions, runMetaData, collection, runCallbacks).
    then(runId => {
      if (this.get('runLinkID')) {
        __WEBPACK_IMPORTED_MODULE_6__controllers_RuntimeBridge__["a" /* default */].disposeRun(this.get('runLinkID'));
      }
      this.set('runLinkID', runId);
    });
  },

  getDummyFormDataHeader: function () {
    var boundary = 'multipart/form-data; boundary=' + this.getDummyFormDataBoundary();
    return boundary;
  },

  generateHTTPRequest: async function () {
    var method = this.get('method');
    if (!method) {
      method = 'get';
    }
    method = method.toUpperCase();

    var httpVersion = 'HTTP/1.1';

    var url = await this.getURLForSnippet();

    var hostAndPath = this.splitUrlIntoHostAndPath(url);

    var path = hostAndPath.path;
    var host = hostAndPath.host;

    // to escape html escape sequences
    path = path.replace(/&/g, '&amp;');

    var headers = await this.getXhrHeaders();

    var dataMode = this.get('body').get('dataMode');

    if (__WEBPACK_IMPORTED_MODULE_1__utils_util__["a" /* default */].isMethodWithBody(method)) {
      if (dataMode === 'params') {
        headers = this.setHeaderInArray(headers, 'Content-Type', this.getDummyFormDataHeader());
      }
    }

    var hasBody = __WEBPACK_IMPORTED_MODULE_1__utils_util__["a" /* default */].isMethodWithBody(method);
    var body;

    if (hasBody) {
      body = await this.getRequestBodyPreview();
    }
    var requestPreview;

    requestPreview = '';
    requestPreview += method + ' ' + path + ' ' + httpVersion + '\n';

    // only add Host header if the request doesn't already have it
    if (!_.find(headers, function (h) {return h && h.key && h.key.toLowerCase() == 'host';})) {
      requestPreview += 'Host: ' + host + '\n';
    }

    var headersCount = headers.length;
    for (var i = 0; i < headersCount; i++) {
      requestPreview += headers[i].key + ': ' + headers[i].value + '\n';
    }

    if (hasBody && body !== false) {
      requestPreview += '\n' + body;
    }

    return requestPreview;
  },

  // For Cmd+B when the raw body format is JSON or XML
  beautifyBody: function () {
    let mode = this.get('body').get('editorMode');
    try {
      if (mode === 'javascript') {
        let oldBody = this.get('body').get('data');
        this.get('body').set('data', JSON.stringify(JSON.parse(oldBody), null, 4));
      } else
      if (mode === 'xml') {
        let oldBody = this.get('body').get('data');
        this.get('body').set('data', __WEBPACK_IMPORTED_MODULE_16__utils_vkbeautify__["a" /* default */].xml(oldBody, null, true));
      }
    }
    catch (e) {
      console.warn('Could not beautify. Invalid JSON or XML');
    }
  },

  getRequestBodyPreview: async function () {
    var body = this.get('body');
    var dataMode = body.get('dataMode');
    var method = this.get('method');
    if (!__WEBPACK_IMPORTED_MODULE_1__utils_util__["a" /* default */].isMethodWithBody(method)) {
      return false;
    }

    if (dataMode === 'raw') {
      var rawBodyData = body.get('data');

      rawBodyData = __WEBPACK_IMPORTED_MODULE_12__utils_ResolveVariableHelper__["a" /* default */].resolve(rawBodyData, (await this.getVariablesMap()));
      return rawBodyData;
    } else
    if (dataMode === 'params') {
      var formDataBody = await this.getFormDataPreview(false);
      if (formDataBody !== false) {
        return formDataBody;
      } else
      {
        return false;
      }
    } else
    if (dataMode === 'urlencoded') {
      var urlEncodedBodyData = await this.getUrlEncodedBody(false);
      if (urlEncodedBodyData !== false) {
        return urlEncodedBodyData;
      } else
      {
        return false;
      }
    }
  },

  getFormDataPreview: async function (getDisabled) {
    var params = this.get('body').get('data');
    if (!params) {
      return '';
    }

    let paramsCount = params.length,
    body = '',
    variablesMap = await this.getVariablesMap(),
    boundary = this.getDummyFormDataBoundary();

    for (var i = 0; i < paramsCount; i++) {
      var param = params[i];

      // two hyphens before actual boundary (https://www.w3.org/Protocols/rfc1341/7_2_Multipart.html)
      body += '--' + boundary;
      if (param.type === 'file') {
        body += '\nContent-Disposition: form-data; name="' + __WEBPACK_IMPORTED_MODULE_12__utils_ResolveVariableHelper__["a" /* default */].resolve(param.key, variablesMap) + '"; filename=';
        body += '"' + __WEBPACK_IMPORTED_MODULE_12__utils_ResolveVariableHelper__["a" /* default */].resolve(_.get(param, 'value[0].name'), variablesMap) + '"\n';
        body += 'Content-Type: ' + __WEBPACK_IMPORTED_MODULE_12__utils_ResolveVariableHelper__["a" /* default */].resolve(_.get(param, 'value[0].type'), variablesMap);
        body += '\n\n\n';
      }

      // if(param.type === "text") {
      else {
          body += '\nContent-Disposition: form-data; name="' + __WEBPACK_IMPORTED_MODULE_12__utils_ResolveVariableHelper__["a" /* default */].resolve(param.key, variablesMap) + '"\n\n';
          body += __WEBPACK_IMPORTED_MODULE_12__utils_ResolveVariableHelper__["a" /* default */].resolve(param.value, variablesMap);
          body += '\n';
        }
    }

    // two hyphens before and after actual boundary (https://www.w3.org/Protocols/rfc1341/7_2_Multipart.html)
    body += '--' + boundary + '--';
    return body;
  },

  getUrlEncodedBody: async function (getDisabled) {
    return await this.get('body').getUrlEncodedBody(getDisabled);
  },

  // returns the "encapsulated boundary" as in https://www.w3.org/Protocols/rfc1341/7_2_Multipart.html
  getDummyFormDataBoundary: function () {
    var boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW';
    return boundary;
  },

  stripScriptTag: function (text) {
    if (!text) {return text;}

    var re = /<script\b[^>]*>([\s\S]*?)<\/script>/gm;
    text = text.replace(re, '');
    return text;
  },

  saveResponseToRequest() {
    var request = this,
    response = request.get('response').toJSON(), // @todo, this always gets old response data, id won't be available
    isNew = false,
    callback;

    if (!response.id) {
      isNew = true;
      response.id = __WEBPACK_IMPORTED_MODULE_1__utils_util__["a" /* default */].guid();
    }
    if (response.__id) {
      delete response.__id;
    }
    if (!request.get('id') || !response.name) {
      return;
    }

    response.sdkResponse = undefined; // @todo Prashant What is this?

    let staticRequest = {
      'url': request.get('url'),
      'pathVariableData': request.get('pathVariableData'),
      'queryParams': request.get('queryParams'),
      'headerData': request.get('headerData'),
      'data': request.get('body') ? request.get('body').get('data') : null,
      'method': request.get('method'),
      'dataMode': request.get('body') ? request.get('body').get('dataMode') : null };


    let requestId = request.get('id');

    response.request = requestId;
    response.requestObject = staticRequest;

    let responseEvent = isNew ? {
      name: 'create_deep',
      namespace: 'response',
      data: {
        response,
        target: {
          model: 'request',
          modelId: requestId } } } :


    {
      name: 'update',
      namespace: 'response',
      data: _extends({}, response) };


    Object(__WEBPACK_IMPORTED_MODULE_8__modules_pipelines_user_action__["a" /* default */])(responseEvent).
    then(eventResponse => {
      if (!_.isEmpty(_.get(eventResponse, 'error'))) {
        console.error('Error in creating response', eventResponse.error);
        return;
      }

      let responseList = _.clone(this.get('responses')) || [];
      if (isNew) {
        responseList.push(response);
      } else
      {
        let isFoundAtIndex = _.findIndex(responseList, ['id', response.id]);
        isFoundAtIndex >= 0 && (responseList[isFoundAtIndex] = response);
      }

      this.set('responses', responseList);
      request.loadSampleResponseById(response.id);
    }).
    catch(err => {
      console.error('Error in pipeline for creating response', err);
    });
  },

  serialize: function (tabMode) {
    // @todo Need to figure out a better approach to handle mutations on the properties of the
    // serialized request object without much performance overhead.
    let requestJsonBody = _.cloneDeep(this.get('body').toJSON()),
    serializedRequest = _.assign(
    _.pick(this.toJSON(), [
    'id',
    'isFromCollection',
    'collectionId',
    'collection',
    'description',
    'editorMode',
    'folder',
    'headerData',
    'auth',
    'method',
    'lifecycle',
    'name',
    'pathVariableData',
    'events',
    'testResults',
    'testErrors',
    'url',
    'queryParams',
    'version',
    'write']),
    {
      data: requestJsonBody.data,
      dataMode: requestJsonBody.dataMode,
      body: requestJsonBody });


    let response = this.get('response');

    if (response && response.canSave(tabMode)) {
      let serializedResponse = response.serialize(tabMode);
      _.assign(serializedRequest, { response: serializedResponse });
    } else {
      _.assign(serializedRequest, {
        response: new Response().toJSON(),
        lifecycle: 'idle' });

    }

    return serializedRequest;
  } },


// A static method for class Request (http://backbonejs.org/#Model-extend)
{
  deserialize: function (data) {
    return new Request(_.assign(data, {
      body: new __WEBPACK_IMPORTED_MODULE_0__RequestBody__["a" /* default */](data.body),
      response: new Response(data.response) }));

  } });


/**
         * Backbone model representing a single response of a request
         *
         * @todo Incomplete
         * @class {Object} Response
         * @extends {Backbone.Model}
         *
         * @property {String} status                 -
         * @property {Object} responseCode           -
         * @property {Number} time                   -
         * @property {Object[]} headers              -
         * @property {Cookie[]} cookies              -
         * @property {String} mime                   -
         * @property {String} text                   -
         * @property {String} language               -
         * @property {String} previewType            -
         * @property {Boolean} write                 -
         */
var Response = __WEBPACK_IMPORTED_MODULE_17_backbone___default.a.Model.extend( /** @lends Response.prototype */{
  defaults: function () {
    return {
      __id: __WEBPACK_IMPORTED_MODULE_1__utils_util__["a" /* default */].guid(),
      status: '',
      responseCode: {},
      time: 0,
      headers: [],
      cookies: [],
      mime: '',
      text: '',
      language: '',
      previewType: 'parsed',
      write: true };

  },

  initialize: function () {
  },

  loadSampleResponse: function (requestModel, response) {
    if (!response) {
      return;
    }

    if (response.id) {
      this.set('id', response.id);
      this.set('name', response.name);
    }
    this.set('status', response.status);
    this.set('responseCode', response.responseCode);
    this.set('responseSize', response.responseSize);
    this.set('headers', response.headers);
    this.set('cookies', response.cookies);
    this.set('mime', response.mime);
    this.set('language', response.language);
    this.set('text', response.text);
    this.set('previewType', response.previewType);
  },

  clear: function () {
    this.set({
      'status': '',
      'responseCode': {},
      'time': 0,
      'headers': [],
      'cookies': [],
      'mime': '',
      'text': '',
      'language': '',
      'previewType': 'parsed',
      'write': true });

  },

  canSave(tabMode) {
    if (tabMode && tabMode === 'exampleResponse') {
      return true;
    }

    let responseText = this.get('text');
    return _.size(responseText) < window.postman_sync_rawtext_limit;
  },

  serialize(tabMode) {
    if (this.canSave(tabMode)) {
      return _.assign(_.pick(this.toJSON(), [
      '__id',
      'id',
      'name',
      'code',
      'cookies',
      'fileName',
      'headers',
      'language',
      'mime',
      'mimeType',
      'previewType',
      'responseCode',
      'responseSize',
      'status',
      'text',
      'time',
      'write']));

    }

    return new Response().toJSON();
  } });





/**
                               * An Example Response
                               *
                               * @typedef {Object} Example
                               */

/**
                                   * Indicates that the request has changed
                                   *
                                   * @event Request#change
                                   *
                                   * @param {Request} model - Thew, cahnged request model
                                   * @param {Object} options - The additional options passed when this change event was triggered
                                   */

/**
                                       * Indicates that the request's `url` property was changed
                                       *
                                       * @event Request#change:url
                                       *
                                       * @param {Request} model  - The new, changed request model
                                       * @param {URL} value      - The new value of the notifications property of the tab
                                       * @param {Object} options - The additional options passed when this event was triggered
                                       */

/**
                                           * Indicates that the request's response was changed
                                           *
                                           * @event Request#responseChanged
                                           */

/**
                                               * Indicates that the response's property was changed
                                               *
                                               * @event Response#change
                                               *
                                               * @param {Response} model - The new, changed response model
                                               * @param {Object} options - The additional options passed when this event was triggered
                                               */
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),

/***/ 1095:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = __webpack_require__(1);
var PropTypes = __webpack_require__(9);

var ALL_INITIALIZERS = [];
var READY_INITIALIZERS = [];

function isWebpackReady(getModuleIds) {
  if (( false ? 'undefined' : _typeof(__webpack_require__.m)) !== 'object') {
    return false;
  }

  return getModuleIds().every(function (moduleId) {
    return typeof moduleId !== 'undefined' && typeof __webpack_require__.m[moduleId] !== 'undefined';
  });
}

function load(loader) {
  var promise = loader();

  var state = {
    loading: true,
    loaded: null,
    error: null
  };

  state.promise = promise.then(function (loaded) {
    state.loading = false;
    state.loaded = loaded;
    return loaded;
  }).catch(function (err) {
    state.loading = false;
    state.error = err;
    throw err;
  });

  return state;
}

function loadMap(obj) {
  var state = {
    loading: false,
    loaded: {},
    error: null
  };

  var promises = [];

  try {
    Object.keys(obj).forEach(function (key) {
      var result = load(obj[key]);

      if (!result.loading) {
        state.loaded[key] = result.loaded;
        state.error = result.error;
      } else {
        state.loading = true;
      }

      promises.push(result.promise);

      result.promise.then(function (res) {
        state.loaded[key] = res;
      }).catch(function (err) {
        state.error = err;
      });
    });
  } catch (err) {
    state.error = err;
  }

  state.promise = Promise.all(promises).then(function (res) {
    state.loading = false;
    return res;
  }).catch(function (err) {
    state.loading = false;
    throw err;
  });

  return state;
}

function resolve(obj) {
  return obj && obj.__esModule ? obj.default : obj;
}

function render(loaded, props) {
  return React.createElement(resolve(loaded), props);
}

function createLoadableComponent(loadFn, options) {
  var _class, _temp;

  if (!options.loading) {
    throw new Error('react-loadable requires a `loading` component');
  }

  var opts = Object.assign({
    loader: null,
    loading: null,
    delay: 200,
    timeout: null,
    render: render,
    webpack: null,
    modules: null
  }, options);

  var res = null;

  function init() {
    if (!res) {
      res = loadFn(opts.loader);
    }
    return res.promise;
  }

  ALL_INITIALIZERS.push(init);

  if (typeof opts.webpack === 'function') {
    READY_INITIALIZERS.push(function () {
      if (isWebpackReady(opts.webpack)) {
        return init();
      }
    });
  }

  return _temp = _class = function (_React$Component) {
    _inherits(LoadableComponent, _React$Component);

    function LoadableComponent(props) {
      _classCallCheck(this, LoadableComponent);

      var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

      init();

      _this.state = {
        error: res.error,
        pastDelay: false,
        timedOut: false,
        loading: res.loading,
        loaded: res.loaded
      };
      return _this;
    }

    LoadableComponent.preload = function preload() {
      return init();
    };

    LoadableComponent.prototype.componentWillMount = function componentWillMount() {
      var _this2 = this;

      this._mounted = true;

      if (this.context.loadable && Array.isArray(opts.modules)) {
        opts.modules.forEach(function (moduleName) {
          _this2.context.loadable.report(moduleName);
        });
      }

      if (!res.loading) {
        return;
      }

      if (typeof opts.delay === 'number') {
        if (opts.delay === 0) {
          this.setState({ pastDelay: true });
        } else {
          this._delay = setTimeout(function () {
            _this2.setState({ pastDelay: true });
          }, opts.delay);
        }
      }

      if (typeof opts.timeout === 'number') {
        this._timeout = setTimeout(function () {
          _this2.setState({ timedOut: true });
        }, opts.timeout);
      }

      var update = function update() {
        if (!_this2._mounted) {
          return;
        }

        _this2.setState({
          error: res.error,
          loaded: res.loaded,
          loading: res.loading
        });

        _this2._clearTimeouts();
      };

      res.promise.then(function () {
        update();
      }).catch(function (err) {
        update();
        throw err;
      });
    };

    LoadableComponent.prototype.componentWillUnmount = function componentWillUnmount() {
      this._mounted = false;
      this._clearTimeouts();
    };

    LoadableComponent.prototype._clearTimeouts = function _clearTimeouts() {
      clearTimeout(this._delay);
      clearTimeout(this._timeout);
    };

    LoadableComponent.prototype.render = function render() {
      if (this.state.loading || this.state.error) {
        return React.createElement(opts.loading, {
          isLoading: this.state.loading,
          pastDelay: this.state.pastDelay,
          timedOut: this.state.timedOut,
          error: this.state.error
        });
      } else if (this.state.loaded) {
        return opts.render(this.state.loaded, this.props);
      } else {
        return null;
      }
    };

    return LoadableComponent;
  }(React.Component), _class.contextTypes = {
    loadable: PropTypes.shape({
      report: PropTypes.func.isRequired
    })
  }, _temp;
}

function Loadable(opts) {
  return createLoadableComponent(load, opts);
}

function LoadableMap(opts) {
  if (typeof opts.render !== 'function') {
    throw new Error('LoadableMap requires a `render(loaded, props)` function');
  }

  return createLoadableComponent(loadMap, opts);
}

Loadable.Map = LoadableMap;

var Capture = function (_React$Component2) {
  _inherits(Capture, _React$Component2);

  function Capture() {
    _classCallCheck(this, Capture);

    return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
  }

  Capture.prototype.getChildContext = function getChildContext() {
    return {
      loadable: {
        report: this.props.report
      }
    };
  };

  Capture.prototype.render = function render() {
    return React.Children.only(this.props.children);
  };

  return Capture;
}(React.Component);

Capture.propTypes = {
  report: PropTypes.func.isRequired
};
Capture.childContextTypes = {
  loadable: PropTypes.shape({
    report: PropTypes.func.isRequired
  }).isRequired
};


Loadable.Capture = Capture;

function flushInitializers(initializers) {
  var promises = [];

  while (initializers.length) {
    var init = initializers.pop();
    promises.push(init());
  }

  return Promise.all(promises).then(function () {
    if (initializers.length) {
      return flushInitializers(initializers);
    }
  });
}

Loadable.preloadAll = function () {
  return new Promise(function (resolve, reject) {
    flushInitializers(ALL_INITIALIZERS).then(resolve, reject);
  });
};

Loadable.preloadReady = function () {
  return new Promise(function (resolve, reject) {
    // We always will resolve, errors should be handled within loading UIs.
    flushInitializers(READY_INITIALIZERS).then(resolve, resolve);
  });
};

module.exports = Loadable;

/***/ }),

/***/ 1146:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1147);


/***/ }),

/***/ 1147:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__init__ = __webpack_require__(1155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__styles_requester_scss__ = __webpack_require__(2123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__styles_requester_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__styles_requester_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_loadable__ = __webpack_require__(1095);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_loadable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_loadable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_TelemetryHelpers__ = __webpack_require__(497);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__modules_services_AnalyticsService__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_empty_states_CrashHandler__ = __webpack_require__(446);









const Requester = __WEBPACK_IMPORTED_MODULE_4_react_loadable___default()({
  loader: () => __webpack_require__.e/* import() */(20).then(__webpack_require__.bind(null, 2521)),
  loading: () => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', null) });


if (false) {
  window.React = React;
} else {
  window.onbeforeunload = () => {
    return false;
  };
}

const rootEl = document.getElementsByClassName('app-root')[0];

__WEBPACK_IMPORTED_MODULE_2__init__["a" /* default */].init(err => {
  if (err) {
    Object(__WEBPACK_IMPORTED_MODULE_1_react_dom__["render"])(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__components_empty_states_CrashHandler__["a" /* default */], { showError: true }), rootEl);
    return;
  }
  Object(__WEBPACK_IMPORTED_MODULE_1_react_dom__["render"])(
  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__components_empty_states_CrashHandler__["a" /* default */], null,
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(Requester, null)),

  rootEl,
  () => {
    let loadTime = Object(__WEBPACK_IMPORTED_MODULE_5__utils_TelemetryHelpers__["a" /* getWindowLoadTime */])();
    __WEBPACK_IMPORTED_MODULE_6__modules_services_AnalyticsService__["a" /* default */].addEvent('app_performance_metric', 'requester_window_loaded', null, null, { load_time: loadTime });
  });

});

/***/ }),

/***/ 1155:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_async_series__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_async_series___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_async_series__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__boot_bootConfig__ = __webpack_require__(450);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__boot_bootConfig___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__boot_bootConfig__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__boot_bootLogger__ = __webpack_require__(451);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__boot_bootMessaging__ = __webpack_require__(452);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__boot_bootWLModels__ = __webpack_require__(453);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__boot_bootDBWatcher__ = __webpack_require__(1469);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__boot_bootAppModels__ = __webpack_require__(470);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__boot_bootSettings__ = __webpack_require__(494);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__boot_bootTelemetry__ = __webpack_require__(495);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__boot_bootIndependentServices__ = __webpack_require__(2093);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__boot_bootSession__ = __webpack_require__(640);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__boot_bootRequester__ = __webpack_require__(2102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__boot_booted__ = __webpack_require__(496);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__boot_bootThemeManager__ = __webpack_require__(648);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__boot_bootConfigurations__ = __webpack_require__(400);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__boot_bootInAppMessage__ = __webpack_require__(2116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__boot_bootRuntimeListeners__ = __webpack_require__(2118);



















const windowConfig = {
  process: 'requester',
  ui: true };


window.pm = {};

pm.init = done => {
  __WEBPACK_IMPORTED_MODULE_0_async_series___default()([
  __WEBPACK_IMPORTED_MODULE_1__boot_bootConfig___default.a.init(windowConfig),
  __WEBPACK_IMPORTED_MODULE_2__boot_bootLogger__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_3__boot_bootMessaging__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_8__boot_bootTelemetry__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_14__boot_bootConfigurations__["a" /* initializeConfigurations */],
  __WEBPACK_IMPORTED_MODULE_7__boot_bootSettings__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_4__boot_bootWLModels__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_10__boot_bootSession__["a" /* bootSession */],
  __WEBPACK_IMPORTED_MODULE_9__boot_bootIndependentServices__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_6__boot_bootAppModels__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_16__boot_bootRuntimeListeners__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_5__boot_bootDBWatcher__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_13__boot_bootThemeManager__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_15__boot_bootInAppMessage__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_11__boot_bootRequester__["a" /* default */]],
  err => {
    Object(__WEBPACK_IMPORTED_MODULE_12__boot_booted__["a" /* default */])(err);
    if (err) {
      console.error('Error in the app boot sequence', err);
    }
    done && done(err);
  });
};

/* harmony default export */ __webpack_exports__["a"] = (pm);

/***/ }),

/***/ 1469:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_services_DBResourceWatcher__ = __webpack_require__(830);


/**
                                                                           *
                                                                           */
function bootWLModels(cb) {
  __WEBPACK_IMPORTED_MODULE_0__modules_services_DBResourceWatcher__["a" /* default */].subscribeToEventBus();
  pm.logger.info('DBWatcher~boot - Success');
  cb();
}

/* harmony default export */ __webpack_exports__["a"] = (bootWLModels);

/***/ }),

/***/ 171:
/***/ (function(module, exports) {

module.exports = require("zlib");

/***/ }),

/***/ 18:
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),

/***/ 193:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(_) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BaseConfigurationService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_events__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_events___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_events__);
let

BaseConfigurationService = class BaseConfigurationService extends __WEBPACK_IMPORTED_MODULE_0_events___default.a {
  _getLayerNamespaces() {
    return _.map(this.layers, layer => layer.namespace);
  }

  _getResolved(key) {
    if (this.resolvedConfiguration[key] === undefined) {
      return Promise.reject(new Error('ConfigurationService: Could not get config. Key does not exist'));
    }
    return Promise.resolve(this.resolvedConfiguration[key]);
  }

  // Single level access support
  get(key) {
    // cache hit
    if (this.resolvedConfiguration) {
      return this._getResolved(key);
    }

    // cache miss
    return this.
    resolveConfigurationLayers().
    then(resolvedConfiguration => {
      this.resolvedConfiguration = resolvedConfiguration;
      return this._getResolved(key);
    });
  }

  // @todo Lazy loading implementation
  //
  // NOTE: PREVENT MISUSE OF THIS METHOD.
  // USE THE GET METHOD TO GET SPECIFIED KEYS.
  _getAll() {
    // cache hit
    if (this.resolvedConfiguration) {
      return Promise.resolve(this.resolvedConfiguration);
    }

    // cache miss
    return this.
    resolveConfigurationLayers().
    then(resolvedConfiguration => {
      this.resolvedConfiguration = resolvedConfiguration;
      return this.resolvedConfiguration;
    });
  }

  /**
     * Resolves single level JSON
     */
  resolveConfigurationLayers() {
    return Promise.all(_.map(this.resolutionOrder, i => this.layers[i].controller.getAll())).
    then(configurations => {
      let resolvedConfiguration = {};
      _.forEach(configurations, configuration => {
        Object.assign(resolvedConfiguration, configuration);
      });
      return resolvedConfiguration;
    });
  }

  invalidateCache() {
    this.resolvedConfiguration = null;
    this.emit('changed');
  }};
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),

/***/ 2093:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(_) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_async_series__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_async_series___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_async_series__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_PmConsole__ = __webpack_require__(635);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__controllers_Shortcuts__ = __webpack_require__(990);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_ToastManager__ = __webpack_require__(636);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_helpers_OAuth2Tokens__ = __webpack_require__(2095);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_cookies_CookieManager__ = __webpack_require__(2096);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_helpers_OAuth2Manager__ = __webpack_require__(2097);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__controllers_ElectronContextMenu__ = __webpack_require__(2099);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__models_collections_CollectionClipboard__ = __webpack_require__(2101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__models_Toasts__ = __webpack_require__(638);











/**
                                                *
                                                * @param {*} cb
                                                */
function bootIndependentServices(cb) {
  _.assign(window.pm, {
    toasts: __WEBPACK_IMPORTED_MODULE_9__models_Toasts__,
    toastManager: new __WEBPACK_IMPORTED_MODULE_3__models_ToastManager__["a" /* default */](),
    cookieManager: new __WEBPACK_IMPORTED_MODULE_5__models_cookies_CookieManager__["a" /* default */](),
    oAuth2Tokens: new __WEBPACK_IMPORTED_MODULE_4__models_helpers_OAuth2Tokens__["a" /* default */](),
    oAuth2Manager: new __WEBPACK_IMPORTED_MODULE_6__models_helpers_OAuth2Manager__["a" /* default */](),
    contextMenuManager: new __WEBPACK_IMPORTED_MODULE_7__controllers_ElectronContextMenu__["a" /* default */](),
    clipboard: new __WEBPACK_IMPORTED_MODULE_8__models_collections_CollectionClipboard__["a" /* default */](),
    console: new __WEBPACK_IMPORTED_MODULE_1__models_PmConsole__["a" /* default */]('builder') });

  pm.logger.info('IndependentServices~boot - Success');
  cb && cb(null);
}

/* harmony default export */ __webpack_exports__["a"] = (bootIndependentServices);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),

/***/ 2095:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(_) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_util__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_services_ModelService__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_backbone__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_backbone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_backbone__);




var OAuth2Token = __WEBPACK_IMPORTED_MODULE_2_backbone___default.a.Model.extend({
  defaults: function () {
    return {
      'id': '',
      'name': 'OAuth2 Token',
      'access_token': '',
      'expires_in': 0,
      'timestamp': 0 };

  } });


var OAuth2Tokens = __WEBPACK_IMPORTED_MODULE_2_backbone___default.a.Collection.extend({
  model: OAuth2Token,

  comparator: function (a, b) {
    var at = a.get('timestamp'),
    bt = b.get('timestamp');

    return at > bt;
  },

  initialize: function () {
    pm.mediator.on('addOAuth2Token', this.addAccessToken, this);
    pm.mediator.on('updateOAuth2Token', this.updateAccessToken, this);
    pm.mediator.on('deleteOAuth2Token', this.deleteAccessToken, this);
    this.loadAllAccessTokens();
  },

  loadAllAccessTokens: function () {
    __WEBPACK_IMPORTED_MODULE_1__modules_services_ModelService__["a" /* default */].
    find('oauth2accesstoken', {}).
    then(accessTokens => {
      accessTokens.forEach(token => {
        this.add(token, { merge: true });
      });
      pm.mediator.trigger('loadedAllStoredOAuth2Tokens');
    }).
    catch(e => {
      console.error('Error in fetching oauth2 access tokens', e);
    });
  },

  /**
      * @param {Object} tokenData - object having access_token and other optional attributes like scope, token_type, etc
      */
  addAccessToken: function (tokenData) {
    var accessToken = {
      'id': __WEBPACK_IMPORTED_MODULE_0__utils_util__["a" /* default */].guid(),
      'timestamp': new Date().getTime(),
      'data': [] };


    // make sure data is added to token response for any response
    // openID and other implementations may have different keys for access token
    // this allows users to manually copy the key from the response
    _.forOwn(tokenData, function (value, key) {
      if (key !== 'result') {
        accessToken.data.push({
          key: key,
          value: value });

      }
    });

    tokenData.access_token && (accessToken.access_token = tokenData.access_token);

    // @todo: the result is not being used anywhere, confirm with kane before removing
    if (tokenData.hasOwnProperty('access_token')) {
      accessToken.data.push({
        key: 'result',
        value: 'success' });

    }
    __WEBPACK_IMPORTED_MODULE_1__modules_services_ModelService__["a" /* default */].
    create('oauth2accesstoken', accessToken).
    then(() => {
      var at = new OAuth2Token(accessToken);
      this.add(at, { merge: true });
      pm.mediator.trigger('addedOAuth2Token', accessToken);
    }).
    catch(e => {
      console.error('Error in adding access token', e);
    });
  },

  updateAccessToken: function (params) {
    var token = this.get(params.id);

    token.set('name', params.name);
    __WEBPACK_IMPORTED_MODULE_1__modules_services_ModelService__["a" /* default */].
    findOne('oauth2accesstoken', { id: params.id }).
    then(tokenFromDb => {
      if (tokenFromDb) {
        return __WEBPACK_IMPORTED_MODULE_1__modules_services_ModelService__["a" /* default */].
        update('oauth2accesstoken', token.toJSON());
      }

      // @todo Will this ever be called? This flow is only used to update the name of an already saved accessToken @samvel
      return __WEBPACK_IMPORTED_MODULE_1__modules_services_ModelService__["a" /* default */].
      create('oauth2accesstoken', token);
    }).
    then(() => {
      pm.mediator.trigger('updatedOAuth2Token', token.id);
    }).
    catch(e => {
      console.error('Error in updating access token', e);
    });
  },

  deleteAccessToken: function (id) {
    __WEBPACK_IMPORTED_MODULE_1__modules_services_ModelService__["a" /* default */].
    delete('oauth2accesstoken', { id }).
    then(() => {
      this.remove(id);
    }).
    catch(e => {
      console.log('Error in deleting access token', e);
    });
  },

  deleteAllAccessTokens: function (callback) {
    __WEBPACK_IMPORTED_MODULE_1__modules_services_ModelService__["a" /* default */].
    delete('oauth2accesstoken', {}).
    then(() => {
      this.reset();
      _.isFunction(callback) && callback();
    }).
    catch(e => {
      console.log('Error in deleting access tokens');
      this.reset();
      _.isFunction(callback) && callback(e);
    });
  } });


/* harmony default export */ __webpack_exports__["a"] = (OAuth2Tokens);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),

/***/ 2096:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(_) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_util__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_async__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_async___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_async__);



const session = __webpack_require__(18).remote.session;

/**
                                                     * @typedef {Object} Cookie
                                                     */

/**
                                                         * Handles the 'Manage Cookies' modal in electron
                                                         *
                                                         * @class CookieManager
                                                         *
                                                         * @todo Incomplete
                                                         */let
CookieManager = class CookieManager {

  constructor() {
    this.cookies = {};
  }

  // when the app loads
  // load all session cookies into this.cookies

  // when a request is being sent
  // if the cookies header is present > (call webContent.cookies.set)
  // and add to this.cookies

  // when a response is received
  // for each set cookie header, parse the Set-Cookie header and add it to .set and the store > NOTE- this might never be called
  // also get the cookies for the request's domain, and re-add to this.cookies (if electron parses response headers on it's own)

  loadCookies(callback) {
    let cookieStore = session.fromPartition(__WEBPACK_IMPORTED_MODULE_0__utils_util__["a" /* default */].getCookiePartition()).cookies;

    // This makes sure we clear all the cookies in each domain, but retain the domain
    // We ignore the cache because, now the main process can delete cookies
    // and we have no means to update out cache.
    _.forEach(_.keys(this.cookies), domain => {
      this.cookies[domain] = {};
    });

    cookieStore.get({}, (error, cookies) => {
      try {
        if (error) {
          throw error;
        }

        _.each(cookies, cookie => {
          var domain = cookie.domain;
          if (domain[0] == '.') {
            domain = domain.substring(1);
          }
          if (!this.cookies.hasOwnProperty(domain)) {
            this.cookies[domain] = {};
          }
          !this.cookies[domain][cookie.name] && (this.cookies[domain][cookie.name] = []);
          this.cookies[domain][cookie.name].push(cookie);
        });
        pm.mediator.trigger('loadedCookies', this.getDomainList());
      }
      catch (e) {
        console.error(e);
      } finally
      {
        _.isFunction(callback) && callback();
      }
    });
  }

  /**
    * @private
     * @param requestUrl - the URL as seen in the UI. Electron will do the domain resolution
     */
  reloadCookiesForDomain(requestUrl) {
    let cookieStore = session.fromPartition(__WEBPACK_IMPORTED_MODULE_0__utils_util__["a" /* default */].getCookiePartition()).cookies;

    cookieStore.get({ url: requestUrl }, (error, cookies) => {
      if (error) {throw error;}

      _.each(cookies, cookie => {
        if (!this.cookies.hasOwnProperty(cookie.domain)) {
          this.cookies[cookie.domain] = {};
        }
        this.cookies[cookie.domain][cookie.name] = cookie;
      });
    });
  }

  getAllCookies() {
    return _.cloneDeep(this.cookies);
  }

  getAllCookiesAsync(cb) {
    let self = this,
    cookieStore = session.fromPartition(__WEBPACK_IMPORTED_MODULE_0__utils_util__["a" /* default */].getCookiePartition()).cookies;

    cookieStore.get({}, (error, cookies) => {
      if (error) {
        return cb(error);
      }

      _.each(cookies, cookie => {
        var domain = cookie.domain;
        if (domain[0] == '.') {
          domain = domain.substring(1);
        }
        if (!this.cookies.hasOwnProperty(domain)) {
          this.cookies[domain] = {};
        }
        this.cookies[domain][cookie.name] = cookie;
      });

      cb(null, this.cookies);
    });
  }

  getCookiesForDomain(domain) {
    if (domain[0] === '.') {
      domain = domain.slice(1);
    }
    return this.cookies[domain];
  }

  getDomainList() {
    var retVal = [];
    for (var domain in this.cookies) {
      if (this.cookies.hasOwnProperty(domain)) {
        retVal.push(domain);
      }
    }
    return retVal;
  }

  // Acc. to the spec at https://tools.ietf.org/html/rfc6265#section-5.1.4
  getCookiesForUrl(url) {
    if (!url) {return [];}
    url = __WEBPACK_IMPORTED_MODULE_0__utils_util__["a" /* default */].ensureProperUrl(url);
    try {
      var urlObject = __WEBPACK_IMPORTED_MODULE_0__utils_util__["a" /* default */].getURLProps(url),
      hostname = urlObject.hostname,
      domainCookies = _.values(this.getCookiesForDomain(hostname));
      return _.filter(domainCookies, function (domainCookie) {
        return (
          !urlObject.pathname ||
          urlObject.pathname == domainCookie.path ||
          urlObject.pathname.indexOf(domainCookie.path) == 0 && (
          urlObject.pathname[domainCookie.path.length] == '/' ||
          _.last(domainCookie.path) == '/'));


      });
    }
    catch (e) {
      // invalid URL
      return [];
    }
  }

  /*
    * cookie string is the value of the Cookies header
    * add these cookies to URL
    */
  addCookies(url, cookieString) {
    try {
      var urlObject = __WEBPACK_IMPORTED_MODULE_0__utils_util__["a" /* default */].getURLProps(url);
      var host = urlObject.host;
      var cookies = __WEBPACK_IMPORTED_MODULE_0__utils_util__["a" /* default */]._parseCookieHeader(host, cookieString);
      _.each(cookies, cookie => {
        this.addSingleCookie(url, host, cookie);
      });
    }
    catch (e) {
      console.error('Could not add cookies for invalid URL');
      console.error(e);
    }
  }

  addSingleCookie(url, host, cookie, callback) {
    let cookieStore = session.fromPartition(__WEBPACK_IMPORTED_MODULE_0__utils_util__["a" /* default */].getCookiePartition()).cookies;
    if (!host) {return;}

    var urlKey = host;
    urlKey[0] == '.' && (urlKey = urlKey.substring(1));
    if (!this.cookies.hasOwnProperty(urlKey)) {
      this.cookies[urlKey] = {};
    }

    // cookie will be loaded once the callback is successful
    if (cookie.url.indexOf('http://') !== 0 && cookie.url.indexOf('https://') !== 0) {
      cookie.url = 'http://' + cookie.url;
    }

    if (!cookie.domain) {
      cookie.domain = host;
    }
    if (!cookie.Path) {
      cookie.Path = '/';
    }

    if (host[0] == '.') {
      host = host.substring(1);
    }
    var cookieToSet = {
      url: cookie.url,
      name: cookie.name,
      value: cookie.value,
      domain: host,
      path: cookie.path,
      secure: cookie.secure,
      expirationDate: cookie.expires,
      httpOnly: cookie.httpOnly };


    cookieStore.set(cookieToSet,
    error => {
      if (error) {
        _.isFunction(callback) && callback(error);
        return;
      }

      this.loadCookies(() => {
        _.isFunction(callback) && callback();
      });
    });
  }

  /**
    * Called when a New domain is added from the Cookie Modal
    * @private
    */
  addNewDomain(domainName) {
    if (!domainName || domainName == '') {
      return;
    }
    domainName = domainName.toLowerCase();
    if (!this.cookies.hasOwnProperty(domainName)) {
      this.cookies[domainName] = {};
    }
  }

  editCookie(domain, cookieName, newCookie, callback) {
    let cookieStore = session.fromPartition(__WEBPACK_IMPORTED_MODULE_0__utils_util__["a" /* default */].getCookiePartition()).cookies;
    cookieStore.get({}, (error, cookies) => {
      _.each(cookies, cookie => {
        cookie.domain = cookie.domain[0] === '.' ? cookie.domain.slice(1) : cookie.domain;
        _.isEqual(cookie.domain, domain) && _.isEqual(cookie.name, cookieName) && this.deleteCookie(domain, cookieName, cookie.path, error => {
          error && _.isFunction(callback) && callback(error);

          this.addSingleCookie(newCookie.url, newCookie.domain, newCookie, error => {
            _.isFunction(callback) && callback(error);
          });
        });
      });
    });
  }

  deleteDomain(domain, callback) {
    let cookiesForDomain = this.cookies[domain],
    cookiesToDelete = _.flatMap(cookiesForDomain); // take the values and flatten them

    // The delete single cookie logic deletes multiple cookies with same name
    // and then adds back the ones which shouldn't have been deleted. So we should do this
    // in series, otherwise because of concurrency we will end up with some cookies non-deleted
    __WEBPACK_IMPORTED_MODULE_1_async___default.a.eachSeries(cookiesToDelete, (cookie, next) => {
      this.deleteCookie(domain, cookie.name, cookie.path, next);
    }, () => {
      // wait for all cookies to be deleted, then delete the domain too from UI
      delete this.cookies[domain];
      this.loadCookies(() => {
        _.isFunction(callback) && callback();
      });
    });
  }

  deleteCookie(domain, cookieName, path, callback) {
    let cookieStore = session.fromPartition(__WEBPACK_IMPORTED_MODULE_0__utils_util__["a" /* default */].getCookiePartition()).cookies,
    url = domain + path,
    matchingCookies = _.get(this.cookies, [domain[0] === '.' ? domain.slice(1) : domain, cookieName]);

    if (!matchingCookies) {
      return;
    }

    if (url[0] === '.') {
      url = 'www' + url;
    }

    var httpUrl = url,
    httpsUrl = url,
    index = _.findIndex(matchingCookies, { path });

    if (index === -1) {
      _.isFunction(callback) && callback();
      return;
    }

    if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
      httpUrl = 'http://' + url;
      httpsUrl = 'https://' + url;
    }

    cookieStore.remove(httpUrl, cookieName, error => {
      if (error) {
        _.isFunction(callback) && callback(error);
        return;
      }

      cookieStore.remove(httpsUrl, cookieName, error => {
        if (error) {
          _.isFunction(callback) && callback(error);
          return;
        }

        if (_.size(matchingCookies) <= 1) {
          this.loadCookies(() => {
            _.isFunction(callback) && callback();
          });
          return;
        }

        // If there were multiple cookies with same name & different paths,
        // this would have deleted all those cookies, adding them back
        matchingCookies.splice(index, 1); // remove the one which was intended to be deleted
        __WEBPACK_IMPORTED_MODULE_1_async___default.a.each(matchingCookies, (cookie, next) => {
          cookie.url = cookie.domain + cookie.path;
          cookie.secure ? cookie.url = 'https://' + cookie.url : cookie.url = 'http://' + cookie.url;
          this.addSingleCookie(cookie.url, cookie.domain, cookie, next);
        }, () => {
          this.loadCookies(() => {
            _.isFunction(callback) && callback();
          });
        });
      });
    });
  }};



/* harmony default export */ __webpack_exports__["a"] = (CookieManager);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),

/***/ 2097:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(_) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__OAuth2TokenFetcher__ = __webpack_require__(2098);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_services_ModelService__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_backbone__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_backbone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_backbone__);




var DEFAULT_TOKEN_NAME = 'OAuth2 Token',
OAuth2Manager = __WEBPACK_IMPORTED_MODULE_2_backbone___default.a.Model.extend({
  defaults: function () {
    return {
      oAuth2: {
        accessTokenUrl: '',
        addTokenTo: 'url',
        client_authentication: 'header',
        authUrl: '',
        clientId: '',
        clientSecret: '',
        grant_type: 'authorization_code',
        name: 'Token Name',
        password: '',
        redirect_uri: '',
        scope: '',
        state: '',
        showPassword: false,
        username: '' },

      savedOAuth2Tokens: [] };

  },

  initialize: function () {
    pm.mediator.on('addedOAuth2Token', this.addOAuth2Token, this);
    pm.mediator.on('loadedAllStoredOAuth2Tokens', this.loadCurrentTokens, this);
    this.oAuth2TokenFetcher = new __WEBPACK_IMPORTED_MODULE_0__OAuth2TokenFetcher__["a" /* default */]();
    this.loadCurrentTokens();
    this.on('change:oAuth2', this.updateDB);
    __WEBPACK_IMPORTED_MODULE_1__modules_services_ModelService__["a" /* default */].
    findOne('authhelperstate', { id: 'oAuth2-meta' }).
    then(helper => {
      if (helper) {
        this.set('oAuth2', this.translateFromLegacy.oAuth2(helper.auth));
      }
    }).
    catch(e => {
      console.log('Error in fetching oauth2-meta');
    });
  },

  updateDB: function () {
    var helper = { id: 'oAuth2-meta' };
    helper.auth = this.translateIntoLegacy.oAuth2(this.toJSON().oAuth2);
    __WEBPACK_IMPORTED_MODULE_1__modules_services_ModelService__["a" /* default */].
    findOne('authhelperstate', { id: 'oAuth2-meta' }).
    then(helperFromDb => {
      if (helperFromDb) {
        return __WEBPACK_IMPORTED_MODULE_1__modules_services_ModelService__["a" /* default */].
        update('authhelperstate', helper);
      }
      return __WEBPACK_IMPORTED_MODULE_1__modules_services_ModelService__["a" /* default */].
      create('authhelperstate', helper);
    }).
    catch(e => {
      console.log('Error in fetching oauth2-meta', e);
    });
  },

  setToDefault: function () {
    this.set(this.defaults());
  },

  processOAuth2RequestToken: function () {
    let params = this.get('oAuth2'); // Currently entered parameters on the UI
    this.oAuth2TokenFetcher.trigger('startAuthorization', this.translateIntoLegacy.oAuth2(params));
  },

  processOAuth2DeleteToken: function (token) {
    let currentTokens = _.clone(this.get('savedOAuth2Tokens'));

    pm.mediator.trigger('deleteOAuth2Token', token.id);

    currentTokens = currentTokens.filter(function (tk) {
      return tk.id !== token.id;
    });
    this.set('savedOAuth2Tokens', currentTokens);
  },

  loadOAuth2Token: function (rawToken) {
    let currentTokens = _.clone(this.get('savedOAuth2Tokens'));
    var newTokenData = _.zipObject(_.map(rawToken.data, 'key'), _.map(rawToken.data, 'value'));
    newTokenData.id = rawToken.id;
    newTokenData.name = rawToken.name;
    currentTokens.push(newTokenData);
    this.set('savedOAuth2Tokens', currentTokens);
  },

  addOAuth2Token: function (newToken) {
    let currentTokens = _.clone(this.get('savedOAuth2Tokens')),
    currentTokenDataInForm = this.get('oAuth2'),
    newTokenData;

    if (!_.isEmpty(currentTokenDataInForm.name) && _.isEmpty(newToken.name)) {
      let params = {
        id: newToken.id,
        name: currentTokenDataInForm.name };

      pm.mediator.trigger('updateOAuth2Token', params);
      newTokenData = _.zipObject(_.map(newToken.data, 'key'), _.map(newToken.data, 'value'));
      newTokenData.id = newToken.id;
      newTokenData.name = currentTokenDataInForm.name || DEFAULT_TOKEN_NAME;
      currentTokens.push(newTokenData);
      pm.mediator.trigger('newOAuth2Token', newTokenData);
      this.set('savedOAuth2Tokens', currentTokens);
    } else
    {
      newTokenData = _.zipObject(_.map(newToken.data, 'key'), _.map(newToken.data, 'value'));
      newTokenData.id = newToken.id;
      newTokenData.name = newToken.name || DEFAULT_TOKEN_NAME;
      currentTokens.push(newTokenData);
      pm.mediator.trigger('newOAuth2Token', newTokenData);
      this.set('savedOAuth2Tokens', currentTokens);
    }
  },

  loadCurrentTokens: function () {
    if (typeof pm.oAuth2Tokens !== 'undefined') {
      let currentTokens = pm.oAuth2Tokens.models || [];
      currentTokens.forEach(token => {
        let rawToken = token.toJSON();
        this.loadOAuth2Token(rawToken);
      });
    }
  },

  deleteAllTokens: function (callback) {
    pm.oAuth2Tokens && pm.oAuth2Tokens.
    deleteAllAccessTokens(() => {
      this.setToDefault();
      _.isFunction(callback) && callback();
    });
  },

  translateIntoLegacy: {
    oAuth2: function (newParams) {
      return {
        access_token_url: newParams.accessTokenUrl,
        add_token_to: newParams.addTokenTo || 'url',
        authorization_url: newParams.authUrl,
        client_authentication: newParams.client_authentication,
        client_id: newParams.clientId,
        client_secret: newParams.clientSecret,
        grant_type: newParams.grant_type,
        name: newParams.name,
        password: newParams.password,
        redirect_uri: newParams.redirect_uri,
        scope: newParams.scope,
        state: newParams.state,
        showPassword: newParams.showPassword,
        username: newParams.username };

    } },


  translateFromLegacy: {
    oAuth2: function (newParams) {
      return {
        accessTokenUrl: newParams.access_token_url,
        addTokenTo: newParams.add_token_to || 'url',
        authUrl: newParams.authorization_url,
        client_authentication: newParams.client_authentication,
        clientId: newParams.client_id,
        clientSecret: newParams.client_secret,
        grant_type: newParams.grant_type,
        name: newParams.name,
        password: newParams.password,
        redirect_uri: newParams.redirect_uri,
        scope: newParams.scope,
        state: newParams.state,
        showPassword: newParams.showPassword,
        username: newParams.username };

    } } });



/* harmony default export */ __webpack_exports__["a"] = (OAuth2Manager);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),

/***/ 2098:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(_) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_electron__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_electron___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_electron__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_ModelToSdkTransformer__ = __webpack_require__(479);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_postman_collection__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_postman_collection___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_postman_collection__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_util__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__stores_get_store__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_ResolveVariableHelper__ = __webpack_require__(637);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_backbone__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_backbone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_backbone__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__utils_VariableSessionHelper__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__modules_services_VariableSessionService__ = __webpack_require__(138);










/**
                                                                                                       * Interface that talks to {@link OAuth2TokenRequester} for completing OAuth 2.0 token generation flows.
                                                                                                       *
                                                                                                       * @class OAuth2TokenFetcher
                                                                                                       */
var OAuth2TokenFetcher = __WEBPACK_IMPORTED_MODULE_6_backbone___default.a.Model.extend( /** @lends OAuth2TokenFetcher.prototype */{
  defaults: function () {
    return {
      id: 'oAuth2',
      authorization_url: '',
      access_token_url: '',
      client_id: '',
      client_secret: '',
      grant_type: 'authorization_code',
      scope: '' };

  },

  initialize: function () {
    this.on('startAuthorization', this.startAuthorization);
    __WEBPACK_IMPORTED_MODULE_0_electron__["ipcRenderer"].on('oauth2TokenRequestCallback', this.onOAuth2TokenRequestCallback);
    __WEBPACK_IMPORTED_MODULE_0_electron__["ipcRenderer"].on('oauth2TokenRequestResponse', this.onOAuth2TokenRequestResponse);
  },

  /**
      * Sends IPC event to start OAuth 2.0 token request flow.
      * Also takes care or resolving environment variables in params.
      * @param {Object} params unresolved auth definition
      *
      * @fires IPC#oauth2GetNewToken
      */
  startAuthorization: function (params) {
    let environmentId = Object(__WEBPACK_IMPORTED_MODULE_4__stores_get_store__["a" /* getStore */])('ActiveEnvironmentStore').id,
    globalsId = Object(__WEBPACK_IMPORTED_MODULE_4__stores_get_store__["a" /* getStore */])('ActiveGlobalsStore').id,
    workspaceId = Object(__WEBPACK_IMPORTED_MODULE_4__stores_get_store__["a" /* getStore */])('ActiveWorkspaceStore').id;

    Object(__WEBPACK_IMPORTED_MODULE_8__modules_services_VariableSessionService__["e" /* getVariableSessionMap */])({ environmentId, globalsId, workspaceId }).
    then(variablesMap => {
      let authParams = {
        grant_type: _.clone(params.grant_type),
        access_token_url: __WEBPACK_IMPORTED_MODULE_5__utils_ResolveVariableHelper__["a" /* default */].resolve(_.clone(params.access_token_url), variablesMap),
        authorization_url: __WEBPACK_IMPORTED_MODULE_5__utils_ResolveVariableHelper__["a" /* default */].resolve(_.clone(params.authorization_url), variablesMap),
        client_authentication: __WEBPACK_IMPORTED_MODULE_5__utils_ResolveVariableHelper__["a" /* default */].resolve(_.clone(params.client_authentication), variablesMap),
        client_id: __WEBPACK_IMPORTED_MODULE_5__utils_ResolveVariableHelper__["a" /* default */].resolve(_.clone(params.client_id), variablesMap),
        client_secret: __WEBPACK_IMPORTED_MODULE_5__utils_ResolveVariableHelper__["a" /* default */].resolve(_.clone(params.client_secret), variablesMap),
        password: __WEBPACK_IMPORTED_MODULE_5__utils_ResolveVariableHelper__["a" /* default */].resolve(_.clone(params.password), variablesMap),
        redirect_uri: __WEBPACK_IMPORTED_MODULE_5__utils_ResolveVariableHelper__["a" /* default */].resolve(_.clone(params.redirect_uri), variablesMap) || '/',
        scope: __WEBPACK_IMPORTED_MODULE_5__utils_ResolveVariableHelper__["a" /* default */].resolve(_.clone(params.scope), variablesMap),
        state: __WEBPACK_IMPORTED_MODULE_5__utils_ResolveVariableHelper__["a" /* default */].resolve(_.clone(params.state), variablesMap),
        username: __WEBPACK_IMPORTED_MODULE_5__utils_ResolveVariableHelper__["a" /* default */].resolve(_.clone(params.username), variablesMap) };


      __WEBPACK_IMPORTED_MODULE_0_electron__["ipcRenderer"].send('oauth2GetNewToken', authParams,
      {
        useSystemProxy: pm.settings.getSetting('useSystemProxy'),
        proxies: pm.proxyListManager.globalProxies.toJSON(),
        certificates: __WEBPACK_IMPORTED_MODULE_1__utils_ModelToSdkTransformer__["a" /* default */].getClientSslCerts(pm.certificateManager) },

      { cookiePartitionId: __WEBPACK_IMPORTED_MODULE_3__utils_util__["a" /* default */].getCookiePartition() });

    });
  },

  /**
      * Listens to OAuth 2.0 token request success and adds the token to the OAuth 2 token list.
      *
      * @param {Object} event Ipc event
      * @param {String} rawErr stringified error
      * @param {String} rawResponse stringified token response
      *
      * @listens IPC#oauth2TokenRequestCallback
      * @fires Mediator#addOAuth2Token
      */
  onOAuth2TokenRequestCallback: function (event, rawErr, rawResponse) {
    let response = rawResponse && JSON.parse(rawResponse);

    if (rawErr) {
      let err = JSON.parse(rawErr);
      pm.toasts.error('Could not complete OAuth 2.0 login. Check Postman Console for more details.');

      // pm console swallows anything but the first argument
      pm.console.error('exception', err);
      pm.console.error('exception', response);

      // dump it on dev tools as well
      console.warn('Could not complete OAuth 2.0 login.', err, response);

      return;
    }

    pm.mediator.trigger('addOAuth2Token', response);
  },

  /**
      * Listens to OAuth 2.0 Token Request API response and logs it Postman Console.
      *
      * @param {Object} event IPC event
      * @param {String} rawErr stringified error
      * @param {Object} trace trace from runtime `io` event
      * @param {Object} cursor collection run cursor
      * @param {SDKResponse~definition} responseJSON json representation of sdk response
      * @param {SDKRequest~definition} requestJSON json representation of sdk request
      */
  onOAuth2TokenRequestResponse: function (event, rawErr, trace, cursor, responseJSON, requestJSON) {
    let err = rawErr && JSON.parse(rawErr),
    request = requestJSON && new __WEBPACK_IMPORTED_MODULE_2_postman_collection__["Request"](requestJSON),
    response = responseJSON && new __WEBPACK_IMPORTED_MODULE_2_postman_collection__["Response"](responseJSON),
    consolePayload = {};

    if (!trace || trace.type !== 'http' || !request) {
      return;
    }

    consolePayload.request = {
      url: _.invoke(request, 'url.toString'),
      method: requestJSON.method,
      headers: _.invoke(request, 'headers.toObject'),
      body: requestJSON.body,
      certificate: requestJSON.certificate,
      proxy: requestJSON.proxy };


    if (response) {
      consolePayload.response = {
        responseTime: response.responseTime,
        code: response.code,
        headers: _.invoke(response, 'headers.toObject'),
        body: response.size().body / 1024 > 1024 ? 'Responses larger than 1MB are not shown' : response.text() };

    }

    if (err) {
      pm.console.netErr(cursor.httpRequestId, err.message, consolePayload);
    } else
    {
      pm.console.net(cursor.httpRequestId, consolePayload);
    }
  } });


/* harmony default export */ __webpack_exports__["a"] = (OAuth2TokenFetcher);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),

/***/ 2099:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(_) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ElectronContextMenu; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_DraftJsHelper__ = __webpack_require__(2100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_pipelines_user_action__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__stores_get_store__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_services_VariableSessionService__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_VariableSessionHelper__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modules_model_event__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__modules_services_AnalyticsService__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_EditorService__ = __webpack_require__(93);









/**
                                                        * Handles context menu creation for Electron
                                                        * Currently, the context menu supports:
                                                        * 1. Encode/Decode URI Component for selected text
                                                        * 2. Set as env var
                                                        * 3. Set as global var
                                                        * @private
                                                        */let
ElectronContextMenu = class ElectronContextMenu {
  constructor() {
    this.Remote = __webpack_require__(18).remote;
    this.Menu = this.Remote.Menu;
    this.MenuItem = this.Remote.MenuItem;

    this.currentSelection = '';
    this.activeComponent = null;
    this.attachEventListeners();
    window.addEventListener('contextmenu', e => {
      e.preventDefault();

      let menu = this.buildMenu(e);

      // Empty menu fix for windows native app
      if (menu && _.size(menu.items)) {
        menu.popup(this.Remote.getCurrentWindow());
      }
    }, false);
  }

  attachEventListeners() {
    pm.mediator.on('textEditor:selectionChange', this.handleSelectionChange, this);
    pm.mediator.on('contextMenu:inputActivated', this.handleActiveInputChange, this);
  }

  handleSelectionChange(value) {
    this.currentSelection = value;
  }

  handleActiveInputChange(component) {
    this.currentSelection = window.getSelection().toString();
    this.activeComponent = component;
  }

  buildMenu(e) {
    let menu = new this.Menu(),
    isInput = _.get(e, 'target.nodeName') === 'INPUT',
    hasAutoSuggest = _.get(this.activeComponent, 'refs.autoSuggest') ? true : false,
    isAceEditor = _.get(e, 'target.className') === 'ace_text-input',
    requesterTab;

    if (_.get(e, 'target.closest') && (requesterTab = e.target.closest('.requester-tab'))) {

      this.buildTabMenu(menu, _.get(requesterTab, 'dataset.tabId'));
    } else
    if (!isInput && _.get(e, 'target.closest') && (e.target.closest('.collection-sidebar-list-item') ||
    e.target.closest('.collection-browser-list-item__folder') ||
    e.target.closest('.collection-browser-list-item__request'))) {
      return null;
    } else
    if (_.get(e, 'target.classList')) {
      if (e.target.classList.contains('requester-tab')) {
        this.buildTabMenu(menu, _.get(e.target, 'dataset.tabId'));
      } else
      if (e.target.classList.contains('requester-tab__name')) {
        this.buildTabMenu(menu, _.get(e.target, 'dataset.tabId'));
      }
    }


    if (!_.isEmpty(this.currentSelection)) {
      this.buildEnvironmentMenu(menu, this.currentSelection);
      this.buildGlobalMenu(menu, this.currentSelection);
      this.buildGenericMenu(menu);
      this.buildEncodeDecodeMenu(menu);
      this.currentSelection = '';
    }

    // Display generic input menu for input
    else if (isInput) {
        this.buildGenericMenu(menu);
      } else

      if (hasAutoSuggest || isAceEditor) {
        this.buildGenericMenu(menu);
        this.buildEncodeDecodeMenu(menu);
        this.activeComponent = null;
      }

    return menu;
  }

  buildTabMenu(menu, id) {

    // dont need isPreview, duplicate can be done for all cases
    menu.append(new this.MenuItem({
      label: 'Duplicate Tab',
      click: () => {
        __WEBPACK_IMPORTED_MODULE_7__services_EditorService__["a" /* default */].duplicate({ id: id });
      } }));

    menu.append(new this.MenuItem({ type: 'separator' }));

    menu.append(new this.MenuItem({
      label: 'Close',
      accelerator: 'CommandOrControl+W',
      click: () => {
        __WEBPACK_IMPORTED_MODULE_7__services_EditorService__["a" /* default */].close({ id: id });
      } }));

    menu.append(new this.MenuItem({
      label: 'Force Close',
      accelerator: 'CommandOrControl+Alt+W',
      click: () => {
        __WEBPACK_IMPORTED_MODULE_7__services_EditorService__["a" /* default */].close({ id: id }, { force: true });
      } }));

    menu.append(new this.MenuItem({
      label: 'Close Other Tabs',
      click: () => {
        __WEBPACK_IMPORTED_MODULE_7__services_EditorService__["a" /* default */].closeAllButCurrent();
      } }));

    menu.append(new this.MenuItem({
      label: 'Close All Tabs',
      click: () => {
        __WEBPACK_IMPORTED_MODULE_7__services_EditorService__["a" /* default */].closeAll();
      } }));

    menu.append(new this.MenuItem({
      label: 'Force Close All Tabs',
      click: () => {
        __WEBPACK_IMPORTED_MODULE_7__services_EditorService__["a" /* default */].requestForceCloseAll();
      } }));

  }

  buildGenericMenu(menu) {

    menu.append(new this.MenuItem({
      label: 'Undo',
      role: 'undo' }));

    menu.append(new this.MenuItem({
      label: 'Redo',
      role: 'redo' }));

    menu.append(new this.MenuItem({ type: 'separator' }));
    menu.append(new this.MenuItem({
      label: 'Cut',
      role: 'cut' }));

    menu.append(new this.MenuItem({
      label: 'Copy',
      role: 'copy' }));

    menu.append(new this.MenuItem({
      label: 'Paste',
      role: 'paste' }));

    menu.append(new this.MenuItem({
      label: 'Select All',
      role: 'selectall' }));

    menu.append(new this.MenuItem({ type: 'separator' }));
  }

  buildEncodeDecodeMenu(menu) {
    menu.append(new this.MenuItem({
      label: 'EncodeURIComponent',
      click: () => {this.encodeURI();} }));

    menu.append(new this.MenuItem({
      label: 'DecodeURIComponent',
      click: () => {this.decodeURI();} }));

  }

  buildEnvironmentMenu(menu, selectionText) {
    let environment = Object(__WEBPACK_IMPORTED_MODULE_2__stores_get_store__["a" /* getStore */])('ActiveEnvironmentStore');
    if (!environment || _.isEmpty(environment.values)) {
      return;
    }
    let environmentName = environment.name;
    let submenu = new this.Menu();

    let environmentVars = _.reject(environment.values, { enabled: false }),
    environmentKeys = _.map(environmentVars, 'key');

    _.forEach(environmentKeys, (key, index) => {
      submenu.append(new this.MenuItem({
        label: key,
        click: () => {this.updateEnvironmentVariableFromContextMenu(index, selectionText);} }));

    });

    menu.append(new this.MenuItem({
      label: 'Set: ' + environmentName,
      type: 'submenu',
      submenu: submenu }));

  }

  buildGlobalMenu(menu, selectionText) {
    let globals = Object(__WEBPACK_IMPORTED_MODULE_2__stores_get_store__["a" /* getStore */])('ActiveGlobalsStore');
    if (!globals || _.isEmpty(globals.values)) {
      return;
    }
    let submenu = new this.Menu();

    let globalVars = _.reject(globals.values, { enabled: false });
    let globalKeys = _.map(globalVars, 'key');

    _.forEach(globalKeys, (key, index) => {
      submenu.append(new this.MenuItem({
        label: key,
        click: () => {this.updateGlobalVariableFromContextMenu(index, selectionText);} }));

    });

    // Show Set:Globals only if globals are present
    if (_.size(globalKeys)) {
      menu.append(new this.MenuItem({
        label: 'Set: Globals',
        type: 'submenu',
        submenu: submenu }));

    }
  }

  encodeURI() {
    var selectionStart, selectionEnd, oldValue, newValue, args;
    if (_.get(this.activeComponent, 'refs.autoSuggest')) {
      var editorState = this.activeComponent.state.editorState,
      selectionObj = __WEBPACK_IMPORTED_MODULE_0__utils_DraftJsHelper__["a" /* default */].getAutoSuggestSelectionRange(editorState);
      oldValue = selectionObj.oldValue;
      selectionStart = selectionObj.selectionStart;
      selectionEnd = selectionObj.selectionEnd;
      args = [];
    } else
    {
      var inputBox = document.activeElement;
      selectionStart = inputBox.selectionStart;
      selectionEnd = inputBox.selectionEnd;
      if (!inputBox || !inputBox.value) {
        return;
      }
      oldValue = inputBox.value;
      args = [null];
    }
    try {
      newValue = oldValue.substring(0, selectionStart) +
      encodeURIComponent(oldValue.substring(selectionStart, selectionEnd)) +
      oldValue.substring(selectionEnd, oldValue.length);
    }
    catch (e) {
      return;
    }
    args.push(newValue);
    if (this.activeComponent && this.activeComponent.handleChange) {
      this.activeComponent.handleChange.apply(this.activeComponent, args);
    }
  }

  decodeURI() {
    var selectionStart, selectionEnd, oldValue, newValue, args;
    if (_.get(this.activeComponent, 'refs.autoSuggest')) {
      var editorState = this.activeComponent.state.editorState,
      selectionObj = __WEBPACK_IMPORTED_MODULE_0__utils_DraftJsHelper__["a" /* default */].getAutoSuggestSelectionRange(editorState);
      oldValue = selectionObj.oldValue;
      selectionStart = selectionObj.selectionStart;
      selectionEnd = selectionObj.selectionEnd;
      args = [];
    } else
    {
      var inputBox = document.activeElement;
      selectionStart = inputBox.selectionStart;
      selectionEnd = inputBox.selectionEnd;
      if (!inputBox || !inputBox.value) {
        return;
      }
      oldValue = inputBox.value;
      args = [null];
    }

    try {
      var newValue = oldValue.substring(0, selectionStart) +
      decodeURIComponent(oldValue.substring(selectionStart, selectionEnd)) +
      oldValue.substring(selectionEnd, oldValue.length);
    }
    catch (e) {
      return;
    }
    args.push(newValue);
    if (this.activeComponent && this.activeComponent.handleChange) {
      this.activeComponent.handleChange.apply(this.activeComponent, args);
    }
  }

  updateGlobalVariableFromContextMenu(index, selectionText) {
    let model = 'globals',
    modelId = Object(__WEBPACK_IMPORTED_MODULE_2__stores_get_store__["a" /* getStore */])('ActiveGlobalsStore').id,
    activeWorkspaceId = Object(__WEBPACK_IMPORTED_MODULE_2__stores_get_store__["a" /* getStore */])('ActiveWorkspaceStore').id,
    sessionId = Object(__WEBPACK_IMPORTED_MODULE_4__utils_VariableSessionHelper__["b" /* getSessionId */])(model, modelId, activeWorkspaceId);

    Object(__WEBPACK_IMPORTED_MODULE_3__modules_services_VariableSessionService__["d" /* getSessionFor */])(sessionId).
    then(session => {
      if (!session) {
        return;
      }

      let values = _.clone(session.values),
      enabledVariables = _.reject(values, { enabled: false });

      enabledVariables[index].value = selectionText;

      let data = {
        id: sessionId,
        model: model,
        modelId: modelId,
        workspace: activeWorkspaceId,
        values: values };


      let updateSessionEvent = Object(__WEBPACK_IMPORTED_MODULE_5__modules_model_event__["a" /* createEvent */])('update', 'variablesession', data);
      __WEBPACK_IMPORTED_MODULE_6__modules_services_AnalyticsService__["a" /* default */].addEvent('session', 'user_edit', model);
      return Object(__WEBPACK_IMPORTED_MODULE_1__modules_pipelines_user_action__["a" /* default */])(updateSessionEvent);
    }).
    catch(err => {
      console.error('Failed to update global value through context menu', err);
      pm.toasts.error('Something went wrong. Please check DevTools.');
    });
  }

  updateEnvironmentVariableFromContextMenu(index, selectionText) {
    let model = 'environment',
    modelId = Object(__WEBPACK_IMPORTED_MODULE_2__stores_get_store__["a" /* getStore */])('ActiveEnvironmentStore').id,
    activeWorkspaceId = Object(__WEBPACK_IMPORTED_MODULE_2__stores_get_store__["a" /* getStore */])('ActiveWorkspaceStore').id,
    sessionId = Object(__WEBPACK_IMPORTED_MODULE_4__utils_VariableSessionHelper__["b" /* getSessionId */])(model, modelId, activeWorkspaceId);

    Object(__WEBPACK_IMPORTED_MODULE_3__modules_services_VariableSessionService__["d" /* getSessionFor */])(sessionId).
    then(session => {
      if (!session) {
        return;
      }

      let values = _.clone(session.values),
      enabledVariables = _.reject(values, { enabled: false });

      enabledVariables[index].value = selectionText;

      let data = {
        id: sessionId,
        model: model,
        modelId: modelId,
        workspace: activeWorkspaceId,
        values: values };


      let updateSessionEvent = Object(__WEBPACK_IMPORTED_MODULE_5__modules_model_event__["a" /* createEvent */])('update', 'variablesession', data);
      __WEBPACK_IMPORTED_MODULE_6__modules_services_AnalyticsService__["a" /* default */].addEvent('session', 'user_edit', model);
      return Object(__WEBPACK_IMPORTED_MODULE_1__modules_pipelines_user_action__["a" /* default */])(updateSessionEvent);
    }).
    catch(err => {
      console.error('Failed to update session through context menu', err);
      pm.toasts.error('Something went wrong. Please check DevTools.');
    });
  }};
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),

/***/ 2100:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_draft_js_lib_getContentStateFragment__ = __webpack_require__(394);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_draft_js_lib_getContentStateFragment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_draft_js_lib_getContentStateFragment__);
let

DraftJsHelper = class DraftJsHelper {
  getAutoSuggestSelectionRange(editorState) {
    var fragment = __WEBPACK_IMPORTED_MODULE_0_draft_js_lib_getContentStateFragment___default()(editorState.getCurrentContent(), editorState.getSelection()),
    oldValue = editorState.getCurrentContent().getPlainText(),
    selectedValue = fragment // eslint-disable-line lodash/prefer-lodash-method
    .map(block => {
      return block.getText();
    }).join('\n'),
    selectionStart = oldValue.indexOf(selectedValue),
    selectionEnd = selectionStart + selectedValue.length;
    return {
      oldValue,
      selectionStart,
      selectionEnd };

  }};


/* harmony default export */ __webpack_exports__["a"] = (new DraftJsHelper());

/***/ }),

/***/ 2101:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(_) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CollectionClipboard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_pipelines_user_action__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_controllers_CollectionController__ = __webpack_require__(44);

let

CollectionClipboard = class CollectionClipboard {
  cutItem(item, collectionId) {
    if (_.isEmpty(item)) {
      return;
    }
    this.clipboard = {
      id: item.id,
      type: item.type,
      collectionId: collectionId,
      action: 'cut' };

  }

  copyItem(item, collectionId) {
    if (_.isEmpty(item)) {
      return;
    }
    this.clipboard = {
      id: item.id,
      type: item.type,
      collectionId: collectionId,
      action: 'copy' };

  }

  async pasteItem(destination) {
    let source = this.getClipboard();

    if (_.isEmpty(source)) {
      return;
    }

    if (source.action === 'cut') {
      this.clearClipboard();
      let moveEvent = {};

      if (destination.type === 'request' && source.type === 'request') {
        moveEvent = {
          name: 'move',
          namespace: 'request',
          data: {
            model: 'request',
            request: { id: source.id },
            after: {
              model: destination.type,
              modelId: destination.id } } };



      } else

      if (_.includes(['collection', 'folder'], destination.type) && _.includes(['request', 'folder'], source.type)) {
        moveEvent = {
          name: 'move',
          namespace: source.type,
          data: {
            model: source.type,
            [source.type]: { id: source.id },
            target: {
              model: destination.type,
              modelId: destination.id } } };



      } else
      if (destination.type === 'request' && source.type === 'folder') {
        let destinationRequest = await __WEBPACK_IMPORTED_MODULE_1__modules_controllers_CollectionController__["a" /* default */].getRequest({ id: destination.id });

        moveEvent = {
          name: 'move',
          namespace: source.type,
          data: {
            model: source.type,
            [source.type]: { id: source.id },
            target: {
              model: destinationRequest.folder ? 'folder' : 'collection',
              modelId: destinationRequest.folder ? destinationRequest.folder : destinationRequest.collection } } };



      }
      if (!_.isEmpty(moveEvent)) {
        Object(__WEBPACK_IMPORTED_MODULE_0__modules_pipelines_user_action__["a" /* default */])(moveEvent).
        then(response => {
          if (!_.isEmpty(_.get(response, 'error'))) {
            console.error(`Error while moving ${source.type} ${destination.type}`, response.error);
            return;
          }
        }).
        catch(err => {
          console.error(`Error in pipeline while moving ${source.type} ${destination.type}`, err);
        });
      }
    } else
    if (source.action === 'copy') {
      this.clearClipboard();
      let duplicateEvent = {};

      if (destination.type === 'request' && _.includes(['request', 'folder'], source.type)) {
        let destinationRequest = await __WEBPACK_IMPORTED_MODULE_1__modules_controllers_CollectionController__["a" /* default */].getRequest({ id: destination.id });
        duplicateEvent = {
          name: 'duplicate',
          namespace: source.type,
          data: {
            model: source.type,
            [source.type]: { id: source.id },
            target: {
              model: destinationRequest.folder ? 'folder' : 'collection',
              modelId: destinationRequest.folder ? destinationRequest.folder : destinationRequest.collection } } };



      } else

      if (_.includes(['folder', 'collection'], destination.type) && _.includes(['folder', 'request'], source.type)) {
        duplicateEvent = {
          name: 'duplicate',
          namespace: source.type,
          data: {
            model: source.type,
            [source.type]: { id: source.id },
            target: {
              model: destination.type,
              modelId: destination.id } } };



      }

      if (!_.isEmpty(duplicateEvent)) {
        Object(__WEBPACK_IMPORTED_MODULE_0__modules_pipelines_user_action__["a" /* default */])(duplicateEvent).
        then(response => {
          if (!_.isEmpty(_.get(response, 'error'))) {
            console.error(`Error while duplicating ${source.type} on ${destination.type}`, response.error);
            return;
          }
        }).
        catch(err => {
          console.error(`Error in pipeline while duplicating ${source.type} on ${destination.type}`, err);
        });
      }
    }
  }

  getClipboard() {
    return this.clipboard;
  }

  clearClipboard() {
    this.clipboard = null;
  }};
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),

/***/ 2102:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(_) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_async_series__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_async_series___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_async_series__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bootStore__ = __webpack_require__(2103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bootShortcuts__ = __webpack_require__(641);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__bootSyncProxy__ = __webpack_require__(642);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__bootTab__ = __webpack_require__(2105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__controllers_UIZoom__ = __webpack_require__(645);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__controllers_ProxyListManager__ = __webpack_require__(646);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_AppUpdateNotifier__ = __webpack_require__(2108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__models_tcp_ElectronTCPReader__ = __webpack_require__(2110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__models_requests_CertificateManager__ = __webpack_require__(647);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__models_ProtocolHandler__ = __webpack_require__(2111);












/**
                                                             *
                                                             * @param {*} cb
                                                             */
function bootRequester(cb) {
  __WEBPACK_IMPORTED_MODULE_0_async_series___default()([
  __WEBPACK_IMPORTED_MODULE_1__bootStore__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_2__bootShortcuts__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_3__bootSyncProxy__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_4__bootTab__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_10__models_ProtocolHandler__["a" /* default */].initialize],
  err => {
    _.assign(window.pm, {
      proxyListManager: new __WEBPACK_IMPORTED_MODULE_6__controllers_ProxyListManager__["a" /* default */](), // [settings]
      certificateManager: new __WEBPACK_IMPORTED_MODULE_9__models_requests_CertificateManager__["a" /* default */](), // [settings]
      uiZoom: new __WEBPACK_IMPORTED_MODULE_5__controllers_UIZoom__["a" /* default */](), // [settings]
      updateNotifier: new __WEBPACK_IMPORTED_MODULE_7__models_AppUpdateNotifier__["a" /* default */](), // [appwindow, settings, app]
      tcpReader: new __WEBPACK_IMPORTED_MODULE_8__models_tcp_ElectronTCPReader__["a" /* default */]() // [settings, appwindow]
    });
    pm.appWindow.sendToElectron({ event: 'postmanInitialized' }); // Initialize protocol handline need revisit

    err ? pm.logger.error('Requester~boot - Failed', err) : pm.logger.info('Requester~boot - Success');

    return cb && cb(err);
  });
}

/* harmony default export */ __webpack_exports__["a"] = (bootRequester);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),

/***/ 2103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stores_store_handler__ = __webpack_require__(2104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_model_event__ = __webpack_require__(5);



const STORE_HANDLER_TIMEOUT = 15 * 1000; // 15 seconds

/**
 *
 */
function bootStore(cb) {

  Object(__WEBPACK_IMPORTED_MODULE_1__modules_model_event__["j" /* subscribeToQueue */])(__WEBPACK_IMPORTED_MODULE_0__stores_store_handler__["a" /* handleModelEventOnStore */], STORE_HANDLER_TIMEOUT);
  pm.logger.info('Store~boot - Success');
  cb && cb(null);
}

/* harmony default export */ __webpack_exports__["a"] = (bootStore);

/***/ }),

/***/ 2104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(_) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return handleModelEventOnStore; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mobx__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_model_event__ = __webpack_require__(5);



/**
                                                                                                                     *
                                                                                                                     * @param {Object} event
                                                                                                                     */
function handleModelEventOnStore(event, callback) {
  let eventNamespace = Object(__WEBPACK_IMPORTED_MODULE_1__modules_model_event__["g" /* getEventNamespace */])(event),
  storeListeners = _.get(pm, ['stores', '_listeners']),
  activeListenersFor = new Set(),
  matchedListeners = [];

  // @todo: this may have issues, when a top level event does not have a store initialized
  // but low level events have stores initialized
  if (!storeListeners) {
    return;
  }

  storeListeners.forEach(storeListenerForNamespace => {
    _.forEach(_.keys(storeListenerForNamespace), listenerName => {
      activeListenersFor.add(listenerName);
    });
  });

  return Object(__WEBPACK_IMPORTED_MODULE_1__modules_model_event__["i" /* processEvent */])(event, Array.from(activeListenersFor), function processEventOnStore(event, cb) {
    if (!storeListeners.has(Object(__WEBPACK_IMPORTED_MODULE_1__modules_model_event__["g" /* getEventNamespace */])(event))) {
      return cb && cb();
    }
    let storeListenersForNamespace = storeListeners.get(Object(__WEBPACK_IMPORTED_MODULE_1__modules_model_event__["g" /* getEventNamespace */])(event)),
    action = Object(__WEBPACK_IMPORTED_MODULE_1__modules_model_event__["f" /* getEventName */])(event),
    listeners = storeListenersForNamespace[action];

    _.forEach(listeners, function (listener) {
      // we create new functions instead of binding
      // listener is already bound with the `store`, we can't find it, or change it
      listener && matchedListeners.push(function () {
        listener(Object(__WEBPACK_IMPORTED_MODULE_1__modules_model_event__["d" /* getEventData */])(event), Object(__WEBPACK_IMPORTED_MODULE_1__modules_model_event__["e" /* getEventMeta */])(event));
      });
    });

    cb && cb();
  }, function () {
    // wrapping all the individual listeners for an event in a transactions
    Object(__WEBPACK_IMPORTED_MODULE_0_mobx__["u" /* transaction */])(function () {
      // listeners are synchronous anyway
      _.forEach(matchedListeners, function invokeStoreListener(listener) {
        listener && listener();
      });
    });

    callback();
  });
}


/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),

/***/ 2105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(_) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_tabs_TabManager__ = __webpack_require__(2106);


/**
                                                        *
                                                        * @param {*} cb
                                                        */
function bootTab(cb) {
  _.assign(window.pm, { tabManager: new __WEBPACK_IMPORTED_MODULE_0__models_tabs_TabManager__["a" /* default */]() });
  pm.logger.info('Tab~boot - Success');
  cb && cb(null);
}

/* harmony default export */ __webpack_exports__["a"] = (bootTab);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),

/***/ 2106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(_) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__requests_Request__ = __webpack_require__(1079);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_util__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_mobx__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__stores_get_store__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_pipelines_user_action__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modules_model_event__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__modules_controllers_CollectionController__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__modules_controllers_UserController__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__modules_services_CollectionPermissionService__ = __webpack_require__(253);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_backbone__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_backbone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_backbone__);











/**
                                  * Add some extra properties to backbone Request instance which are not
                                  * present in the Request snapshot from database
                                  */
function getLegacyRequest(req) {
  if (!req) {
    return new __WEBPACK_IMPORTED_MODULE_0__requests_Request__["a" /* Request */]();
  }

  req.collectionId = req.collectionId || req.collection || null;
  if (req.collectionId) {
    req.isFromCollection = true;
  }
  return new __WEBPACK_IMPORTED_MODULE_0__requests_Request__["a" /* Request */](req);
}


/**
   * The notification identifier
   *
   * @typedef {String} TabNotification
   */

/**
       * @typedef {Object} BuilderState
       *
       * @todo Confirm what latestRequestMap is supposed to be doing
       *
       * @property {Object} tabs - Serialized representation of all tabs
       * @property {UUID} activeTab - ID of the currently active tab
       * @property {Object} latestRequestMap - Serialized representation of all tabs, keyed by the request ID
       */

/**
           * JSON representation of a tab
           *
           * @typedef Tab~definition
           *
           * @property {UUID} id                            - ID of the tab
           * @property {Request} request                    - Request currently loaded in the tab
           * @property {Timestamp} timestamp                - ID of the tab
           * @property {Request} iinitialRequest            - The currently active request, this is used when calculating the tab's dirty status when in request mode
           * @property {Boolean} isDirty                    - Indicates if the tab is dirty
           * @property {Boolean} isGhost                    - Indicates if the tab is a ghost tab
           * @property {Boolean} isPreview                  - Indicates if the tab is a preview tab
           * @property {TabNotification[]} notifications    - The notifications associated with the tab
           * @property {String} mode                        - The current tab mode. (`example` or `request`)
           * @property {String} responseBodyView            - The response body display mode
           * @property {UUID} requestRevisionId             - Revision ID of the currently loaded request
           * @property {Response~definition} initialExample - The currently active example, this is used when calculating the tab's dirty status when in example mode
           */

/**
               * Backbone Model representing a single tab
               * @class Tab
               * @extends {Backbone.Model}
               *
               * @property {UUID} id                            - ID of the tab
               * @property {Request} request                    - Request currently loaded in the tab
               * @property {Timestamp} timestamp                - ID of the tab
               * @property {Request} iinitialRequest            - The currently active request, this is used when calculating the tab's dirty status when in request mode
               * @property {Boolean} isDirty                    - Indicates if the tab is dirty
               * @property {Boolean} isGhost                    - Indicates if the tab is a ghost tab
               * @property {Boolean} isPreview                  - Indicates if the tab is a preview tab
               * @property {TabNotification[]} notifications    - The notifications associated with the tab
               * @property {String} mode                        - The current tab mode. (`example` or `request`)
               * @property {String} responseBodyView            - The response body display mode
               * @property {UUID} requestRevisionId             - Revision ID of the currently loaded request
               * @property {Response~definition} initialExample - The currently active example, this is used when calculating the tab's dirty status when in example mode
               */
var Tab = __WEBPACK_IMPORTED_MODULE_9_backbone___default.a.Model.extend( /** @lends Tab.prototype */{
  /**
                                                               * Returns a set of defaults for a tab
                                                               *
                                                               * @returns {Tab~definition} - The defaults for a tab
                                                               */
  defaults: function () {
    return {
      'id': __WEBPACK_IMPORTED_MODULE_1__utils_util__["a" /* default */].guid(),
      'request': new __WEBPACK_IMPORTED_MODULE_0__requests_Request__["a" /* Request */](),
      'timestamp': Date.now(),
      'initialRequest': null,
      'isDirty': false,
      'isGhost': false,
      'isPreview': false,
      'isBusy': false,
      'notifications': [],
      'mode': 'request',
      'responseBodyView': 'pretty',
      'requestRevisionId': null,
      'initialExample': null,
      'originalRequestState': null };

  },

  /**
      * Adds a notification to the tab's notification list
      *
      * @param {TabNotification} notification - The notification to add to the tab
      *
      * @fires Tab#change
      * @fires Tab#change:notifications
      */
  setNotification(notification) {
    let notifications = this.get('notifications');
    if (!_.includes(notifications, notification)) {
      let newNotifications = _.concat(notifications, notification);
      this.set('notifications', newNotifications);
    }
  },

  /**
      * Removes a notification from the tab's notification list
      *
      * @param {TabNotification} notification - The notification to remove from the tab
      *
      * @fires Tab#change
      * @fires Tab#change:notifications
      */
  unsetNotification(notification) {
    let notifications = this.get('notifications');
    if (_.includes(notifications, notification)) {
      let newNotifications = _.reject(notifications, elem => {
        return elem === notification;
      });
      this.set('notifications', newNotifications);
    }
  },

  /**
      * Marks / unmarks the tab as a Preview tab
      *
      * @param {Boolean} value - Indicates if the tab should be marked as a preview or not.
      *
      * @fires Tab#change
      * @fires Tab#change:isPreview
      */
  setPreview: function (value) {
    this.set('isPreview', value);
  },

  /**
      * Marks / unmarks the tab as a Ghost tab
      *
      * @param {Boolean} value - Indicates if the tab should be marked as a ghost or not.
      *
      * @fires Tab
      * @fires Tab#change:isGhost
      */
  toggleGhost: function (isGhost) {
    this.set('isGhost', isGhost);
  },

  /**
      * Loads a request into the tab. Also sets the tab mode to request mode.
      * Also updates the `isDirty` flag for the model.
      *
      * @param {Request} request - The request to load
      * @param {Object} options - Options
      * @param {Boolean=true} [options.checkDirty] - Check for the dirty
      *
      * @fires Tab#change
      * @fires Tab#change:mode
      * @fires Tab#change:request
      *
      * @see Tab#setInitialRequest
      */
  setRequest: function (request, { checkDirty = true } = {}) {
    this.disableDirtyCheck();
    this.get('mode') === 'exampleResponse' && this.set('mode', 'request');
    this.set('request', request);
    this.setInitialRequest(request);
    this.enableDirtyCheck({ checkDirty });
  },

  /**
      * Sets the tab's request's URL
      *
      * @param {URL} url - URL that needs to be set
      *
      * @fires Tab#change
      * @fires Tab#change:request
      * @fires Request#change
      * @fires Request#change:url
      */
  setUrl: function (url) {
    let newRequest = this.get('request');
    newRequest.set('url', url);
    this.set('request', newRequest);
  },

  /**
      * Detaches all dirty check related listeners from the tab, effectively disabling dirty checking for the tab.
      * Also marks the current tab as non-dirty.
      */
  disableDirtyCheck: function () {
    let request = this.get('request');
    this.off('change:mode', this.checkDirty, this);
    request && request.off('change', this.checkDirty, this);
    request && request.off('responseChanged', this.checkDirty, this);
    request && request.get('body').off('change', this.checkDirty, this);
    request && request.get('response').off('change', this.checkDirty, this);
    this.setDirty(false);
  },

  enableDirtyCheck: function ({ checkDirty = true } = {}) {
    let request = this.get('request');
    this.on('change:mode', this.checkDirty, this);
    request && request.on('change', this.checkDirty, this);
    request && request.on('responseChanged', this.checkDirty, this);
    request && request.get('body').on('change', this.checkDirty, this);
    request && request.get('response').on('change', this.checkDirty, this);
    checkDirty && this.checkDirty();
  },

  /**
      * Compares two examples and checks if they are the same
      *
      * @param {ExampleResponse} savedExample   - The first example to compare
      * @param {ExampleResponse} currentExample - The second example to compate
      *
      * @returns {Boolean} - Indicates if the two examples are the same
      */
  compareExamples(savedExample, currentExample) {
    let pickSavedExample = _.pick(savedExample, ['cookies', 'headers', 'language', 'name', 'request', 'responseCode', 'status', 'text']),
    pickCurrentExample = _.pick(currentExample, ['cookies', 'headers', 'language', 'name', 'request', 'responseCode', 'status', 'text']);

    pickSavedExample.request = _.pick(pickSavedExample.request, ['url', 'headerData', 'data', 'method', 'dataMode', 'queryParams', 'pathVariableData']);
    pickCurrentExample.request = _.pick(pickCurrentExample.request, ['url', 'headerData', 'data', 'method', 'dataMode', 'queryParams', 'pathVariableData']);
    return _.isEqual(pickSavedExample, pickCurrentExample);
  },

  /**
      * Checks if a tab in Example mode is dirty, and accordingly sets the tab's dirty status
      */
  checkDirtyExample() {
    let request = this.get('request'),
    responses = request.get('responses'),
    responseModel = request.get('response'),
    responseId = responseModel.get('id'),
    currentResponse = responseModel.toJSON(),
    staticRequest = {
      'url': request.get('url'),
      'headerData': _.map(request.get('headerData'), header => {return _.pick(header, ['key', 'value', 'description', 'enabled']);}),
      'data': request.get('body') ? request.get('body').get('data') : null,
      'method': request.get('method'),
      'dataMode': request.get('body') ? request.get('body').get('dataMode') : 'params',
      'pathVariableData': request.get('pathVariableData'),
      'queryParams': request.get('queryParams') };


    let savedResponse = _.cloneDeep(this.get('initialExample'));
    if (savedResponse) {
      currentResponse.request = staticRequest;
      savedResponse.headers = _.map(savedResponse.headers, header => {return _.pick(header, ['key', 'value', 'name']);});
      currentResponse.headers = _.map(currentResponse.headers, header => {return _.pick(header, ['key', 'value', 'name']);});
      savedResponse.responseCode = _.omit(savedResponse.responseCode, ['detail']);
      currentResponse.responseCode = _.omit(currentResponse.responseCode, ['detail']);
      if (this.compareExamples(savedResponse, currentResponse)) {
        this.setDirty(false);
      } else
      {
        this.setDirty(true);
      }
    }
  },

  /**
      * Checks if the tab is dirty and accordingly sets the tab's dirty status
      *
      * @listens Tab#change:mode
      * @listens Request#change
      * @listens Request#responseChanged
      * @listens RequestBody#change
      * @listens Response#change
      */
  checkDirty: function () {
    let request = this.get('request'),
    responseModel = request.get('response'),
    responseId = responseModel.get('id'),
    initial = this.get('initialRequest');


    if (this.get('mode') === 'exampleResponse') {
      if (responseId) {
        this.checkDirtyExample();
      } else
      {
        this.setDirty(true);
      }
      return;
    }

    if (!initial) {
      return;
    }

    try {
      var current = this.get('request').getAsObject();
    }
    catch (e) {
      return;
    }

    if (!current) {
      return;
    }
    if (__WEBPACK_IMPORTED_MODULE_1__utils_util__["a" /* default */].compareRequests(current, initial)) {
      this.setDirty(true);
    } else
    {
      this.setDirty(false);
    }
  },

  /**
      * Sets the `initialRequest` property of the tab to the request provided.
      * This is used to compare the tab's dirty status when a new request is loaded / a change is made to a saved request
      *
      * @param {Request~definition} request - The request that will be set to the `initialRequest` property
      *
      * @fires Tab#change
      * @fires Tab#change:initialRequest
      */
  setInitialRequest: function (request) {
    let initialRequest = request;

    if (request && request.getAsObject) {
      initialRequest = request.getAsObject();
    }
    this.set('initialRequest', initialRequest);
  },

  /**
      * Sets the `initialExample` property of the tab.
      * This is used to compare the tab's dirty status when a new example is loaded / a change is made to a saved example
      *
      * @param {Request} request - The request that will be attached to the `initialExample` property
      * @param {ExampleResponse} response - The example that will be set to the `initialExample` property
      *
      * @fires Tab#change
      * @fires Tab#change:initialExample
      */
  setInitialExample: function (request, response) {
    let initialExample = request;
    if (response) {
      initialExample = _.omit(response.toJSON(), ['sdkResponse']);
    }
    initialExample.request = _.invoke(request, 'getAsObject') || null;
    this.set('initialExample', initialExample);
    this.enableDirtyCheck();
  },

  setOriginalRequestState(requestState) {
    this.disableDirtyCheck();
    if (this.get('originalRequestState')) {
      return;
    }
    let currentRequestJSON = this.get('request').toJSON();
    currentRequestJSON.data = currentRequestJSON.body.get('data');
    currentRequestJSON.dataMode = currentRequestJSON.body.get('dataMode');
    let request = getLegacyRequest(_.cloneDeep(currentRequestJSON));

    this.set('originalRequestState', request);
  },

  restoreRequestState() {
    this.disableDirtyCheck();
    let request = this.get('originalRequestState');
    let responses = this.get('request').get('responses') || [];
    if (_.isEmpty(request)) {
      return;
    }
    request.set('responses', responses);
    this.set('request', request);
    this.set('originalRequestState', null);
    this.set('mode', 'request');
    request.trigger('responseChanged');
    this.enableDirtyCheck();
  },

  /**
      * Sets the tab's `requestRevisionId` to the given value
      *
      * @param {UUID} revisionId - The revision to set
      *
      * @fires Tab#change
      * @fires Tab#change:requestRevisionId
      */
  setRequestRevisionId: function (revisionId) {
    this.set('requestRevisionId', revisionId);
  },

  /**
      * Sets a tab's dirty status (`isDirty` property) to the given value.
      * Also marks the tab as not preview if isDirty is true.
      *
      * @param {Boolean} isDirty - The value to set `isDirty` to
      */
  setDirty: function (isDirty) {
    this.set('isDirty', isDirty);
    isDirty && this.setPreview(false);
  } });


/**
         * Controls all tabs
         *
         * @class TabManager
         * @extends {Backbone.Collection}
         */
var TabManager = __WEBPACK_IMPORTED_MODULE_9_backbone___default.a.Collection.extend( /** @lends TabManager.prototype */{
  /**
                                                                                  * @member Tab
                                                                                  */
  model: Tab,

  /**
               * Sets up event listeners
               *
               * @listens Mediator#activeRequestChanged
               * @listens Mediator#ifecycle:completed
               */
  initialize: function () {
    this.latestRequestMap = {};
    this.saveInProgress = false;
    this.saveState = this.saveState.bind(this);
    this.closeOtherTabs = this.closeOtherTabs.bind(this);
    this.closeAllTabs = this.closeAllTabs.bind(this);
    this.addGhostTab = this.addGhostTab.bind(this);
    this.debouncedGhostTab = _.debounce(this.addGhostTab, 300);
    this.engageActiveTab = this.engageActiveTab.bind(this);
    this.on('contextCloseOtherTabs', this.closeOtherTabs);
    this.on('contextCloseAllTabs', this.closeAllTabs);
    this.on('contextDuplicateTab', this.loadDuplicateTab, this);
    pm.mediator.on('loadRequest', this.loadRequestIntoTab, this);
    pm.mediator.on('loadRequestInNewTab', this.loadRequestInNewTab, this);
    pm.mediator.on('addedRequestToTheCollection', this.handleAddRequestToTheCollection, this);
    pm.mediator.on('requestSaved', this.handleRequestSavedToCollection, this);

    // pm.appWindow.trigger('registerInternalEvent', 'nextTab', this.switchToNextTab, this);
    // pm.appWindow.trigger('registerInternalEvent', 'previousTab', this.switchToPreviousTab, this);
    pm.mediator.on('activeRequestChanged', this.handleSaveState);
    pm.mediator.on('request:send', this.engageActiveTab);
    pm.appWindow.trigger('registerInternalEvent', 'saveAllWindowState', this.saveAllWindowState, this);

    this.addNewTab();

    Object(__WEBPACK_IMPORTED_MODULE_2_mobx__["q" /* reaction */])(() => Object(__WEBPACK_IMPORTED_MODULE_3__stores_get_store__["a" /* getStore */])('ActiveWorkspaceSessionStore').workspace, () => {
      let sessionData = Object(__WEBPACK_IMPORTED_MODULE_3__stores_get_store__["a" /* getStore */])('ActiveWorkspaceSessionStore').sessionData;
      this.loadLastSavedRequests({
        tabs: Object(__WEBPACK_IMPORTED_MODULE_2_mobx__["t" /* toJS */])(sessionData.tabs),
        activeTab: Object(__WEBPACK_IMPORTED_MODULE_2_mobx__["t" /* toJS */])(sessionData.activeTab),
        latestRequestMap: Object(__WEBPACK_IMPORTED_MODULE_2_mobx__["t" /* toJS */])(sessionData.latestRequestMap) });

    });

    pm.eventBus.channel('model-events').subscribe((modelEvent = {}) => {
      Object(__WEBPACK_IMPORTED_MODULE_5__modules_model_event__["i" /* processEvent */])(modelEvent, ['updated', 'deleted'], (event, callback) => {
        let eventNamespace = Object(__WEBPACK_IMPORTED_MODULE_5__modules_model_event__["g" /* getEventNamespace */])(event);
        if (eventNamespace !== 'request') {
          return;
        }

        let eventName = Object(__WEBPACK_IMPORTED_MODULE_5__modules_model_event__["f" /* getEventName */])(event),
        request = Object(__WEBPACK_IMPORTED_MODULE_5__modules_model_event__["d" /* getEventData */])(event);

        if (eventName === 'updated') {
          this.handleUpdateCollectionRequest(request);
        } else
        if (eventName === 'deleted') {
          this.handleDeleteCollectionRequest(request.id);
        }

        return callback && callback();
      });
    });
  },

  /**
      * Returns the current state of the builder
      *
      * @returns {BuilderState} - The current builder state
      */
  getState() {
    return {
      tabs: this.serialize(),
      activeTab: this.currentTabId,
      latestRequestMap: _.mapValues(this.latestRequestMap, (value, key) => {
        return _.pick(this.latestRequestMap[key], ['revisionId']);
      }) };

  },

  /**
      * Saves the current builder state, open tabs etc.
      *
      * @listens AppWindow#saveAllWindowState
      *
      * @fires AppWindow#quitApp
      */
  saveAllWindowState: function () {
    pm.app.saveBuilderState(this.getState(), () => {
      pm.appWindow.trigger('sendMessageObject', 'quitApp');
    });
  },

  /**
      * Saves the current builder state to IndexedB
      */
  saveState: function () {
    Object(__WEBPACK_IMPORTED_MODULE_3__stores_get_store__["a" /* getStore */])('ActiveWorkspaceSessionStore').updateState(this.getState());
  },

  /**
      * Responds to all collections being loaded from the IndexedDB.
      * Loads Example responses from IndexedDB to memory.
      *
      * @listens TabManager#loadedCollections
      */
  loadTabSavedExamples: async function () {
    let tabs = this.toJSON();
    await Promise.all(_.map(tabs, async tab => {
      let request = tab.request;
      let collectionRequest = await __WEBPACK_IMPORTED_MODULE_6__modules_controllers_CollectionController__["a" /* default */].getRequest({ id: request.get('id') }, { populate: true });
      if (collectionRequest) {
        request.set('responses', collectionRequest.responses);
      }
    }));
  },

  /**
      * Resets all tabs and loads all requests in the currently active session
      *
      * @fires Tab#change
      * @fires Tab#change:reques
      * @fires Mediator#activeRequestChanged
      */
  loadLastSavedRequests: function (sessionData) {
    this.reset();

    if (!sessionData) {
      this.addNewTab(true);
      return;
    }

    const { activeTab, tabs, latestRequestMap } = sessionData;

    if (_.isEmpty(tabs)) {
      this.addNewTab(true);
      return;
    }

    _.each(tabs, t => {
      let tab = new Tab(t);

      // Normalize the saved tab requests
      __WEBPACK_IMPORTED_MODULE_1__utils_util__["a" /* default */].normalizeRequest(t.request);

      let request = __WEBPACK_IMPORTED_MODULE_0__requests_Request__["a" /* Request */].deserialize(t.request),
      originalRequestState = t.originalRequestState && __WEBPACK_IMPORTED_MODULE_0__requests_Request__["a" /* Request */].deserialize(t.originalRequestState);

      this.latestRequestMap = latestRequestMap || {};

      tab.set('request', request);
      if (originalRequestState) {
        tab.set('originalRequestState', originalRequestState);
      }

      // fix invalid request lifecycle. set to idle if the request had no completed.
      if (!_.includes(['idle', 'completed', 'error', 'PRScriptError', 'testScriptsError'], request.get('lifecycle'))) {
        request.set('lifecycle', 'idle');
      }

      this.add(tab);

      if (request.get('isFromCollection')) {
        __WEBPACK_IMPORTED_MODULE_6__modules_controllers_CollectionController__["a" /* default */].
        getRequest({ id: request.get('id') }).
        then(dbRequest => {
          if (dbRequest) {
            tab.disableDirtyCheck();
            tab.setInitialRequest(getLegacyRequest(dbRequest));
            tab.enableDirtyCheck();
          } else
          {
            tab.disableDirtyCheck();
            tab.setInitialRequest(new __WEBPACK_IMPORTED_MODULE_0__requests_Request__["a" /* Request */](tab.get('initialRequest')));
            tab.enableDirtyCheck();
          }
        });
      } else
      {
        tab.disableDirtyCheck();
        tab.setInitialRequest(new __WEBPACK_IMPORTED_MODULE_0__requests_Request__["a" /* Request */](tab.get('initialRequest')));
        tab.enableDirtyCheck();
      }

      // Switch to active tab
      if (activeTab === tab.get('id')) {
        this.switchTab(tab.get('id'));
        pm.mediator.trigger('activeRequestChanged', request.id);
      }
    });

    this.loadTabSavedExamples();
  },

  /**
      * Responds to a collection request being deleted.
      * Marks the currently loaded request as not being part of any collection.
      *
      * @param {UUID} requestId - ID of the request that was deleted
      *
      * @listens Mediator#removeCollectionRequest
      */
  handleDeleteCollectionRequest: function (requestId) {
    if (!requestId) {
      return;
    }

    let tabs = this.getTabsByRequestId(requestId);
    if (_.isEmpty(tabs)) {
      return;
    }

    _.forEach(tabs, tab => {
      let request = tab.get('request');
      request.set({
        isFromCollection: false,
        collection: null,
        collectionId: null });

      tab.setInitialRequest(new __WEBPACK_IMPORTED_MODULE_0__requests_Request__["a" /* Request */]());
    });
  },

  /**
      * Gets a given tab's position (index)
      *
      * @param {UUID} tabId - ID of the tab whose position is needed
      *
      * @returns {Number} - The position of the tab, -1 if the tab isn't found
      */
  getTabIndex: function (tabId) {
    return _.findIndex(this.models, tab => {
      return tab.id === tabId;
    });
  },

  /**
      * Checks to see if a tab's request has been updated (via collections)
      *
      * @param {UUID} requestId - ID of the request that is loaded in the tab
      * @param {UUID} tabId     - ID of the tab that needs to be checked
      *
      * @returns {Boolean} - Indicates if the request has been updated
      */
  isTabRequestUpdated: function (requestId, tabId) {
    const index = this.getTabIndex(tabId);

    if (index < 0) {
      return false;
    }

    const tab = this.models[index],
    latestRequest = this.latestRequestMap[requestId];
    return tab.get('isDirty') && latestRequest && latestRequest.revisionId !== tab.get('requestRevisionId');
  },

  /**
      * Returns the latest version of the request as stored in `latestRequestMap`
      *
      * @param {UUID} requestId - ID of the request
      *
      * @returns {Request} - The request
      */
  getUpdatedTabRequest: function (requestId) {
    return this.latestRequestMap[requestId];
  },

  /**
      * Responds to a request being updated.
      * This will update the tab based on the changes that were made to the request.
      * @todo Confirm what delta is doing
      *
      * @param {Request} newRequest     - The request that was updated
      * @param {Object | Boolean} delta - Incomplete
      *
      * @fires Request#change
      * @fires Request#change:headers
      * @fires Request#change:headerData
      *
      * @listens Mediator#updateCollectionRequest
      */
  handleUpdateCollectionRequest: function (newRequest) {
    let tabs = this.getTabsByRequestId(newRequest.id);

    if (_.isEmpty(tabs)) {
      if (this.tabClosingInProgress && this.saveInProgress) {
        this.saveInProgress = false;
        this.deleteAdjacentTab(this.deleteTabIndex - 1);
      }
      this.saveInProgress = false;
      return;
    }

    let nextRequest = getLegacyRequest(newRequest);
    nextRequest.set('headerData', nextRequest.getHeaderData());

    const revisionId = __WEBPACK_IMPORTED_MODULE_1__utils_util__["a" /* default */].guid();
    this.latestRequestMap[nextRequest.id] = nextRequest.getAsObject();
    this.latestRequestMap[nextRequest.id].revisionId = revisionId;

    this.handleSaveState();

    _.forEach(tabs, tab => {
      let request = tab.get('request');
      request.set('name', newRequest.name);
      request.set('description', newRequest.description);

      nextRequest.set('isFromCollection', request.get('isFromCollection'));
      nextRequest.set('name', request.get('name'));
      nextRequest.set('description', request.get('description'));

      if (tab.get('request').get('id') === nextRequest.get('id')) {
        let activeTab = this.getCurrentTab();
        if (activeTab && activeTab.id === tab.get('id')) {
          tab.setRequestRevisionId(revisionId);
        }
        tab.setInitialRequest(nextRequest);
        tab.checkDirty();
      }
    });

    if (this.tabClosingInProgress) {
      this.saveInProgress = false;
      this.deleteAdjacentTab(this.deleteTabIndex - 1);
    }
  },

  /**
      * Does basic bootstrapping before loading a request into a tab.
      * Checks if the request belongs o a collection, write permissions, headers and header data and sets appropirate properties.
      * This function is not mutating. It creates a new Request object.
      *
      * @param {Request~definition} request - The request that needs to be prepared.
      * @param {Boolean} isFromCollection   - Indicates if the request belongs to a collection
      *
      * @returns {Request} - The new, updated reqeust object
      *
      * @fires Request#change
      * @fires Request#change:isFromCollection
      * @fires Request#change:write
      * @fires Request#change:headers
      * @fires Request#change:headerData
      */
  prepareRequestForTab: function (request, isFromCollection, next) {
    var newRequest = getLegacyRequest(request);
    let requestWrite = true,
    collectionId = request.collectionId || request.collection;

    newRequest.set('headerData', newRequest.getHeaderData());
    newRequest.set('write', requestWrite);

    if (isFromCollection && collectionId) {
      newRequest.set('isFromCollection', true);
      __WEBPACK_IMPORTED_MODULE_6__modules_controllers_CollectionController__["a" /* default */].getCollection({ id: collectionId }).
      then(collection => {
        __WEBPACK_IMPORTED_MODULE_7__modules_controllers_UserController__["a" /* default */].
        get().
        then(user => {
          if (collection) {
            requestWrite = __WEBPACK_IMPORTED_MODULE_8__modules_services_CollectionPermissionService__["a" /* default */].validate(user.id, 'write', collection);
          }
          newRequest.set('write', requestWrite);
          return next(newRequest);
        });
      }).
      catch(err => {
        console.error('Error getting collection while opening a request in tab', err);
        return next(newRequest);
      });
    } else
    {
      return next(newRequest);
    }
  },

  /**
      * Duplicates the currently active request to collections
      */
  duplicateCurrentRequest: function () {
    let request = this.getCurrentRequest();

    let duplicatedRequest = request.getAsObject();
    duplicatedRequest.id = __WEBPACK_IMPORTED_MODULE_1__utils_util__["a" /* default */].guid();
    duplicatedRequest.name += ' Copy';

    let createRequestEvent = Object(__WEBPACK_IMPORTED_MODULE_5__modules_model_event__["a" /* createEvent */])(
    'create_deep',
    'request',
    {
      request: duplicatedRequest,
      target: {
        model: request.get('folder') ? 'folder' : 'collection',
        modelId: request.get('folder') || duplicatedRequest.collection } });




    Object(__WEBPACK_IMPORTED_MODULE_4__modules_pipelines_user_action__["a" /* default */])(createRequestEvent).
    then(response => {
      if (!_.isEmpty(_.get(response, 'error'))) {
        console.error('Error in duplicating request', response.error);
        return;
      }
    }).
    catch(err => {
      console.error('Error in pipeline while duplicating request', err);
    });
  },

  /**
      * Duplicates a tab and switches to the duplicated tab
      *
      * @param {UUID} tabId - ID of the tab that needs to be duplicated
      *
      * @listens TabManager#contextDuplicateTab
      */
  loadDuplicateTab: function (tabId) {
    let tab = this.get(tabId),
    tabRequest = tab.get('request'),
    newTabId = this.addNewAdjacentTab(tabId),
    newTab = this.get(newTabId);

    this.prepareRequestForTab(tabRequest.getAsObject(), Boolean(tab.get('initialRequest')), newRequest => {
      newRequest.set('responses', tabRequest.get('responses'));
      if (tab.get('mode') === 'exampleResponse') {
        newRequest.set('response', tabRequest.get('response'));
        newRequest.set('lifecycle', 'completed');
      }
      newTab.set('initialExample', tab.get('initialExample'));
      newTab.setRequest(newRequest);
      if (tab.get('isDirty')) {
        newTab.setInitialRequest(new __WEBPACK_IMPORTED_MODULE_0__requests_Request__["a" /* Request */]());
      }
      newTab.set('isDirty', tab.get('isDirty'));
      newTab.set('mode', tab.get('mode'));

      let latestRequest = this.latestRequestMap[newRequest.get('id')];
      if (latestRequest) {
        newTab.setRequestRevisionId(latestRequest.revisionId);
      }

      this.switchTab(newTabId);
    });
  },

  /**
      * Adds a new tab adjacent to a given tab
      *
      * @param {UUID} tabId - ID of the tab next to which a new tab needs to be opened
      */
  addNewAdjacentTab: function (tabId) {
    let tabIndex = this.getTabIndex(tabId || _.get(this.getCurrentTab(), 'id')),
    newTabIndex = tabIndex + 1,
    newTabId;

    let ghostTab = this.getGhostTab();

    if (ghostTab) {
      let ghostTabIndex = this.getTabIndex(ghostTab.get('id')),
      tabs = _.clone(this.models);

      ghostTab.toggleGhost(false);
      tabs.splice(ghostTabIndex, 1);
      tabs.splice(newTabIndex, 0, ghostTab);
      this.reset(tabs);
      newTabId = ghostTab.get('id');
    } else
    {
      let newTab = new Tab();
      this.add(newTab, { at: newTabIndex });
      newTabId = newTab.get('id');
    }

    this.debouncedGhostTab();

    return newTabId;
  },

  /**
      * Returns the tab with a given request loaded
      *
      * @param {UUID} id - ID of the request that is needed
      *
      * @returns {Tab} - The tab with the given request loaded
      */
  getTabByRequestId: function (id) {
    const tab = _.find(this.models, tab => {
      return tab.get('request').id === id;
    });
    return tab;
  },

  /**
      * Loads a request to a tab
      *
      * @param {Request}  request                 - The request that will be loaded
      * @param {Boolean} options.isFromCollection - Indicates if the request belongs to a collections
      * @param {Boolean}  options.isPreview        - Indicates if the request needs to be loaded in a preview tab
      *
      * @listens Mediator#loadRequest
      */
  loadRequestIntoTab: function (request, { isFromCollection = false, isPreview = false } = {}) {
    const requestTab = this.getTabByRequestId(request.id),
    requestTabId = requestTab && requestTab.id,
    currentTab = this.getCurrentTab();

    // If existing request, switch to it
    if (requestTabId) {
      this.switchTab(requestTabId);
      let currentRequestTab = this.get(requestTabId);
      currentRequestTab.setPreview(false);
      this.closePreviewTab();
    }

    // If current tab is dirty or a response is present, load the request in new tab
    else
      if (currentTab.get('isDirty') || currentTab.get('isBusy')) {
        this.loadRequestInNewTab(request, {
          isFromCollection,
          isPreview });

      }

      // If "always on new tab" setting is enabled
      else if (pm.settings.getSetting('requestNewTab')) {
          let firstTab = !_.isEmpty(this.models) && this.models[0];

          // If first tab is not part of a collection, then replace it
          if (firstTab && !firstTab.get('initialRequest')) {
            this.loadRequestInCurrentTab(request, {
              isFromCollection,
              isPreview });

          }

          // If the request is already loaded, switch to the tab
          else if (!_.isEmpty(this.getTabsByRequestId(request.id))) {
              this.switchTab(this.getTabsByRequestId(request.id)[0].id);
            }

            // Else load in new tab
            else {
                this.loadRequestInNewTab(request);
                pm.mediator.trigger('activeRequestChanged', request.id);
              }
        } else
        {
          this.loadRequestInCurrentTab(request, {
            isFromCollection,
            isPreview });

        }
  },

  /**
      * Loads a request to the currently active tab
      *
      * @param {Request} request                  - The request that needs to be loaded
      * @param {Object} options                   - Additional options used when loading the request
      * @param {Boolean} options.isFromCollection - Indicates if the reqeust belongs to a collection
      * @param {Boolean} options.isPreview         - Indicates if the request needs to be loaded in a preview tab
      *
      * @fires Mediator#activeRequestChanged
      *
      * @see Tabs#prepareRequestForTab
      * @see tabs#setRequest
      */
  loadRequestInCurrentTab: function (request, { isFromCollection = false, isPreview = false } = {}) {
    this.prepareRequestForTab(request, isFromCollection, newRequest => {
      let currentTab = this.getCurrentTab(),
      latestRequest = this.latestRequestMap[newRequest.get('id')];

      currentTab.setRequest(newRequest);
      currentTab.setPreview(isPreview);
      if (latestRequest) {
        currentTab.setRequestRevisionId(latestRequest.revisionId);
      }
      pm.mediator.trigger('activeRequestChanged', newRequest.id);
    });
  },

  /**
      * Loads a request into a new tab
      *
      * @param {Request} request                  - The request that needs to be loaded
      * @param {Boolean} options.isFromCollection - Indicates if the request belongs to a collection
      * @param {Boolean} options.isPreview        - Indicates if the new tab needs to be a preview tab
      * @param {Boolean} options.isAdjacent       - Indicates if the new tab needs to be opened adjacent to the currently active tab
      *
      * @listens Mediator#loadRequestInNewTab
      */
  loadRequestInNewTab: function (request, { isFromCollection = false, isPreview = false, isAdjacent = false } = {}) {
    if (isPreview) {
      let requestTab = this.getLastTabByRequest(request.id);
      let savedRequestTab = requestTab && !requestTab.get('isDirty') && !requestTab.get('isPreview');

      if (savedRequestTab) {
        // If the request is open and it isn't dirty
        this.switchTab(requestTab.id);
        this.closePreviewTab(); // close preview tab, if it exists
        return;
      }

      // At this point, if a request is already open, the tab is dirty, or it isn't open at all
      let previewTab = this.getPreviewTab();

      if (previewTab) {
        this.switchTab(previewTab.id);
        this.loadRequestInCurrentTab(request, {
          isFromCollection,
          isPreview });

        return;
      }
    }

    this.prepareRequestForTab(request, isFromCollection, newRequest => {
      let newTabId;

      if (isAdjacent) {
        newTabId = this.addNewAdjacentTab();
      } else
      {
        newTabId = this.addNewTab(false);
      }

      let newTab = this.get(newTabId);
      let latestRequest = this.latestRequestMap[newRequest.get('id')];
      if (latestRequest) {
        newTab.setRequestRevisionId(latestRequest.revisionId);
      }
      newTab.setRequest(newRequest, { checkDirty: false });
      newTab.setPreview(isPreview);
      this.switchTab(newTab.get('id'));
    });
  },

  /**
       * Loads a URL into a new tab.
       * Actually creates a request object and then loads it into the tab.
       *
       * @param {UUID} url - URL of the request that needs to be loaded
       */
  loadUrlIntoTab: function (url) {
    let request = getLegacyRequest({ url: '{{url}}' });

    request && this.loadRequestIntoTab(request.toJSON(), {
      isFromCollection: false,
      isPreview: false });

  },

  /**
      * Closes (deletes) a tab from memory.
      * Opens the confirmation modal for dirty tab.
      *
      * @param {UUID} tabId                    - ID of the tab that needs to be updated
      * @param {Object} opts                   - Additional options used while closing the tab
      * @param {Boolean} opts.skipDirtyCheck   - Indicates if the dirty check needs to be skipped. This will force close the tab
      * @param {Boolean} opts.saveRequest      - Indicates if the loaded request needs to be saved before closing the tab
      * @param {Boolean} opts.saveExample      - Indicates if the loaded example needs to be saved before closing the tab
      * @param {Boolean} opts.duplicateRequest - Indicates if the currently loaded request needs to be duplicated before closing the tab
      *
      * @fires Tabs#showConflictTabModal
      * @fires Tabs#showUnsavedTabCloseModal
      */
  deleteTab: function (tabId, opts) {
    let showCloseModal = false,
    nonGhostTabs = _.filter(this.models, tab => {return !tab.get('isGhost');});

    if (nonGhostTabs.length === 1 && !nonGhostTabs[0].get('isDirty')) {
      let newActiveTab = this.addNewTab(false);
      this.switchTab(newActiveTab);
      this.remove(tabId);
      return;
    }

    let tab = this.get(tabId);

    if (!tab) {
      return;
    }

    let request = tab.get('request');

    if (!request) {
      return;
    }
    let requestId = request.get('id'),
    skipDirtyCheck = opts && opts.skipDirtyCheck;

    if (!skipDirtyCheck && tab.get('isDirty')) {
      this.switchTab(tabId);
      showCloseModal = true;

      if (this.isTabRequestUpdated(requestId, tabId)) {
        // This setTimeout is needed so that when you close multiple dirty tabs, the modal visibly flashes
        // to show that the user is he is working with a different tab now, otherwise it looks like
        // clicking one of the CTAs had no effect
        setTimeout(() => {
          this.trigger('showConflictTabModal', tabId, this.getUpdatedTabRequest(requestId), 'close');
        }, 200);
      } else
      {
        // This setTimeout is needed so that when you close multiple dirty tabs, the modal visibly flashes
        // to show that the user is he is working with a different tab now, otherwise it looks like
        // clicking one of the CTAs had no effect
        setTimeout(() => {
          this.trigger('showUnsavedTabCloseModal', tabId);
        }, 200);
      }

      return;
    }

    if (opts && opts.saveRequest) {
      this.saveInProgress = true;
      let requestSaved = tab.get('request').saveRequest({
        source: tabId,
        skipConflictModal: true });

      if (!requestSaved) {
        this.saveInProgress = false;
        return;
      }
    }
    if (opts && opts.saveExample) {
      this.saveInProgress = true;
      tab.get('request').saveResponseToRequest();
    }

    if (opts && opts.duplicateRequest) {
      this.duplicateCurrentRequest();
    }

    let newActiveTab = null;
    if (tabId === this.currentTabId) {
      let prevTabId = this.getPrevTabId();
      let nextTabId = this.getNextTabId();

      if (prevTabId) {
        newActiveTab = prevTabId;
      } else
      if (nextTabId) {
        newActiveTab = nextTabId;
      } else
      {
        newActiveTab = this.addNewTab(false);
      }


      this.switchTab(newActiveTab);
      this.remove(tabId);
    } else
    {
      this.remove(tabId);
    }

    if (!showCloseModal && this.tabClosingInProgress && !this.saveInProgress) {
      this.deleteAdjacentTab(this.deleteTabIndex - 1);
    }
  },

  /**
      * Closes a given tab's adjacent tab(s).
      * This is called when the user closes all other tabs from the context menu. Proxies to Tabs#deleteTab.
      *
      * @param {Number} index - Position of the tab that is used to calculate the adjacent tabs from
      *
      * @see Tabs#deleteTab
      */
  deleteAdjacentTab: function (index) {
    const tab = this.models[index];

    if (!tab) {
      this.haltCloseAllTabs();
      return;
    }

    // If ghost tab or context menu (Close Others) was called on the selected tab
    if (tab.get('isGhost') || this.selectedTabId === tab.id) {
      this.deleteAdjacentTab(index - 1);
    } else
    {
      this.deleteTabIndex = index;
      this.deleteTab(this.models[index].id);
    }
  },

  /**
      * Closes all tabs
      *
      * @listens TabManager#contextCloseAllTabs
      */
  closeAllTabs: function () {
    this.tabClosingInProgress = true;
    if (this.models.length > 1) {
      this.deleteAdjacentTab(this.models.length - 1);
    }
  },

  /**
      * Force closes all tabs, discarding dirty tabs
      */
  forceCloseCurrentTab() {
    let activeTab = this.getCurrentTab();

    if (activeTab) {
      this.forceCloseTab(activeTab.id);
    }
  },

  /**
      * Force closes a single tab, discarding dirty status
      *
      * @param {UUID} tabId - ID of the tab that needs to be force closed
      */
  forceCloseTab: function (tabId) {
    let tab = this.get(tabId);

    if (tab && !tab.get('isGhost')) {
      let newActiveTab,
      prevTabId = this.getPrevTabId(),
      nextTabId = this.getNextTabId();

      if (prevTabId) {
        newActiveTab = prevTabId;
      } else
      if (nextTabId) {
        newActiveTab = nextTabId;
      }

      this.remove(tabId);
      this.switchTab(newActiveTab);
    }

    if (_.size(this.models) <= 1) {
      this.addNewTab(true);
    }

    this.saveState();
  },

  /**
      * Force closes all tabs, discarding dirty tabs
      */
  forceCloseAllTabs: function () {
    const deleteTab = index => {
      let tab = this.models[index],
      tabId = tab && tab.id;
      if (!tab) {
        let newActiveTab = this.addNewTab(false);
        this.switchTab(newActiveTab);
        return;
      }
      if (tab && !tab.get('isGhost')) {
        this.remove(tabId);
      }
      deleteTab(index - 1);
    };

    if (this.models.length > 1) {
      deleteTab(this.models.length - 1);
    }
  },

  /**
      * Returns the number of dity tabs
      */
  getDirtyTabCount: function () {
    return _.chain(this.models).
    filter(model => {return model.get('isDirty');}).
    size().
    value();
  },

  /**
      * Closes all tabs other than the currenly active one
      *
      * @param {UUID} tabId - ID of the tab to preserve
      *
      * @listens TabManager#contextCloseOtherTabs
      */
  closeOtherTabs: function (tabId) {
    this.tabClosingInProgress = true;
    this.selectedTabId = tabId;
    if (this.models.length > 1) {
      this.deleteAdjacentTab(this.models.length - 1);
    }
  },

  /**
      * Prevents any in-progress close multiple tabs action. Can be `closeAllTabs` or `closeOtherTabs`.
      */
  haltCloseAllTabs: function () {
    // stop the close all tabs chain
    this.tabClosingInProgress = false;

    // reset the selectedTabId which is a filter for closeOtherTabs
    this.selectedTabId = null;
  },

  /**
      * Saves a dirty tab's request
      */
  saveCurrentRequest: function () {
    let currentRequest = this.getCurrentRequest();
    this.saveInProgress = true;
    currentRequest.saveRequest({
      source: this.getCurrentTab().id,
      skipConflictModal: true });

  },

  /**
      * Returns the first tab with a given request loaded
      *
      * @param {Request} request - The request that is used to find the tab
      *
      * @returns {Tab} - The tab that has the given request loaded
      */
  getTabByRequest: function (request) {
    return _.find(this.models, tab => {
      let tabRequest = tab.get('request');
      return request === tabRequest;
    });
  },

  /**
      * Returns the last tab with a given request loaded
      *
      * @param {Request} request - The request that is used to find the tab
      *
      * @returns {Tab} - The tab that has the given request loaded
      */
  getLastTabByRequest: function (requestId) {
    return _.findLast(this.models, tab => {
      let tabRequest = tab.get('request');
      return requestId === tabRequest.id;
    });
  },

  /**
      * Responds to the active request being saved to a collection in memory.
      * Updates appropriate fields to mark the request as being a saved request
      *
      * @param  {Request} request    - The currently active request
      * @param  {Request} newRequest - The request instance that was saved. Ideally, this will be the same request as above, but with collection data
      *
      * @listens Mediator#requestSaved
      *
      * @fires Mediator#activeRequestChanged
      * @fires Request#change
      * @fires Request#change:id
      * @fires Request#change:collectionId
      * @fires Request#change:isFromCollection
      * @fires Request#change:name
      * @fires Request#change:description
      */
  handleRequestSavedToCollection: function (request, newRequest) {
    let requestTab = this.getTabByRequest(request);

    if (!requestTab) {
      return;
    }

    let currentRequest = requestTab.get('request');
    currentRequest.set({
      id: newRequest.id,
      collection: newRequest.collection,
      collectionId: newRequest.collection,
      isFromCollection: true,
      name: newRequest.name,
      description: newRequest.description });


    requestTab.setRequest(currentRequest);
    pm.mediator.trigger('activeRequestChanged', currentRequest.id);
  },

  /**
      * Responds to the active request being saved to a collection in the IndexedDB.
      * Reads the saved request from IndexedDB and loads this instance in the tab.
      *
      * @param {Request} request - The request that was saved
      *
      * @listens Mediator#addedRequestToTheCollection
      *
      * @fires Mediator#activeRequestChanged
      * @fires Request#change
      * @fires Request#change:write
      */
  handleAddRequestToTheCollection: function (request) {
    const currentRequest = this.getCurrentRequest(),
    currentRequestId = this.getCurrentRequest().id,
    savedRequestId = request && request.id;

    if (!savedRequestId) {
      return;
    }

    // Set duplicate request as active
    if (this.duplicateRequestId === savedRequestId) {
      this.duplicateRequestId = null;
      this.loadRequestInCurrentTab(request, { isFromCollection: true });
    } else
    if (currentRequestId === savedRequestId) {
      currentRequest.set('write', true);
      pm.mediator.trigger('activeRequestChanged', currentRequestId);
    }
  },

  /**
      * Closes the currently active tab safely (checking for dirty status etc.)
      *
      * @see Tabs#deleteTab
      */
  closeCurrentTab: function () {
    this.deleteTab(this.currentTabId);
  },

  /**
      * Opens a new tab. Also closes any preview tabs that are open.
      *
      * @fires Mediator#focusBuilder
      *
      * @fires Tabs#addNewTab
      */
  openNewTab: function () {
    this.closePreviewTab();
    this.addNewTab(true);
    pm.mediator.trigger('focusBuilder');
  },

  /**
      * Switches to the next tab in the tab order
      *
      * @listens AppWindow#nextTab
      */
  switchToNextTab: function () {
    let visibleTabs = this.filter(tab => {
      return !tab.get('isGhost');
    });

    if (visibleTabs.length < 2) {
      return;
    }

    let nextTabId = this.getNextTabId();
    if (!nextTabId) {
      nextTabId = visibleTabs[0].id;
    }
    this.switchTab(nextTabId);
  },

  /**
      * Switches to the previous tab in the tab order
      *
      * @listens AppWindow#previousTab
      */
  switchToPreviousTab: function () {
    let visibleTabs = this.filter(tab => {
      return !tab.get('isGhost');
    });

    if (visibleTabs.length < 2) {
      return;
    }

    let nextTabId = this.getPrevTabId();
    if (!nextTabId) {
      nextTabId = visibleTabs[visibleTabs.length - 1].id;
    }
    this.switchTab(nextTabId);
  },

  /**
      * Switches to a tab at the given position in the tab order
      *
      * @param {Number} index - Position (index) of the tab to be switched to
      *
      * @see Tabs#switchTab
      */
  switchToTabNumber: function (index) {
    if (index < -2 || index > 9 || index === 0) {
      return;
    }

    let nonGhostTabs = _.filter(this.models, tab => {return !tab.get('isGhost');});
    let nonGhostTabIds = _.map(nonGhostTabs, tab => {return tab.id;});

    let tab = null;
    if (index > 0) {
      tab = this.get(nonGhostTabIds[index - 1]);
    } else
    {
      tab = this.get(_.last(nonGhostTabIds));
    }

    if (tab) {
      this.switchTab(tab.id);
    }
  },

  remountGhostTab() {
    let ghostTab = this.getGhostTab();
    this.remove(ghostTab);
    this.debouncedGhostTab();
  },

  /**
      * Materializes a ghost tab, if it exists (making it visible to the user), otherwise creates a new tab
      * Also creates a new ghost tab
      *
      * @param {Boolean} active - Indicates if the new tab needs to be set as the new active tab
      */
  addNewTab: function (active) {
    /* if ghost tabs available, make 'em real */
    let ghostTab = this.getGhostTab();
    if (ghostTab) {
      ghostTab.toggleGhost(false);

      if (active) {
        this.switchTab(ghostTab.get('id'));
      }

      ghostTab.setInitialRequest(new __WEBPACK_IMPORTED_MODULE_0__requests_Request__["a" /* Request */]());
      ghostTab.enableDirtyCheck({ checkDirty: false });
      this.debouncedGhostTab();

      return ghostTab.get('id');
    } else
    {
      let tab = new Tab();
      this.add(tab);

      if (active === true) {
        this.switchTab(tab.get('id'));
      }

      tab.setInitialRequest(new __WEBPACK_IMPORTED_MODULE_0__requests_Request__["a" /* Request */]());
      tab.enableDirtyCheck();
      this.debouncedGhostTab();

      return tab.get('id');
    }
  },

  /**
      * Creates a ghost tab. Ghost tabs stay invisible until they are materialized.
      * Returns early if a ghost tab already exists.
      */
  addGhostTab: function () {
    if (this.getGhostTab()) {
      return;
    }

    let tab = new Tab({ 'isGhost': true });

    this.add(tab);
  },

  /**
      * Returns the ghost tab (there can only be one)
      *
      * @returns {Tab} - The ghost tab
      */
  getGhostTab: function () {
    return this.find(tab => {
      return tab.get('isGhost');
    });
  },

  /**
      * Returns the ID of the next tab in the tab order
      *
      * @returns {UUID} - ID of the next tab
      */
  getNextTabId: function () {
    let visibleTabs = this.filter(tab => {
      return !tab.get('isGhost');
    });

    let visibleTabIds = _.map(visibleTabs, tab => {
      return tab.id;
    });

    let currentTabIndex = _.indexOf(visibleTabIds, this.getCurrentTab().id);

    if (currentTabIndex === -1 || currentTabIndex === visibleTabs.length - 1) {
      return null;
    } else
    {
      return visibleTabIds[currentTabIndex + 1];
    }
  },

  /**
      * Returns the ID of the previous tab in the tab order
      *
      * @returns {UUID} - ID of the previous tab
      */
  getPrevTabId: function () {
    let visibleTabs = this.filter(tab => {
      return !tab.get('isGhost');
    });

    let visibleTabIds = _.map(visibleTabs, tab => {
      return tab.id;
    });

    let currentTabIndex = _.indexOf(visibleTabIds, this.getCurrentTab().id);

    if (currentTabIndex === -1 || visibleTabs.length === 1) {
      return null;
    } else
    {
      return visibleTabIds[currentTabIndex - 1];
    }
  },

  /**
      * Marks a new tab as the active tab.
      *
      * @param {UUID} newTabId - ID of the tab that needs to be set as the new active tab
      * @param {Boolean} focus - Indicates if the focus needs to be shifted to the new active tab
      */
  switchTab: function (newTabId, focus = true) {
    if (newTabId === this.currentTabId) {
      return;
    }

    this.currentTabId = newTabId;
    this.trigger('switchTab', newTabId);

    let currentTab = this.getCurrentTab();
    let nextRequestId = currentTab && currentTab.get('request').get('id');
    currentTab && pm.mediator.trigger('activeRequestChanged', nextRequestId);
  },

  /**
      * Reorders a tab before another tab
      *
      * @param {UUID} sourceId      - ID of the tab which was dragged
      * @param {UUID} destinationId - ID of the tab the dragged tab was dropped in to
      */
  reorderTab: function (sourceId, destinationId, position) {
    let tabs = _.clone(this.models),
    sourceTab = this.get(sourceId),
    destinationTab = this.get(destinationId);

    if (!sourceTab || !destinationTab) {
      return;
    }

    let sourceIndex = _.indexOf(tabs, sourceTab);
    tabs.splice(sourceIndex, 1);
    let destinationIndex = _.indexOf(tabs, destinationTab),
    insertAfterIndex = position === 'right' ? destinationIndex + 1 : destinationIndex;

    tabs.splice(insertAfterIndex, 0, sourceTab);

    this.reset(tabs);
  },

  /**
      * Returns a list of all tabs that have a given request loaded
      *
      * @param {UUID} id - ID of the request that is needed
      *
      * @returns {Tab | Tab[]} - All tabs that have the given request loaded
      */
  getTabsByRequestId: function (id) {
    return _.chain(this.models).
    filter(tab => {
      return !tab.get('isGhost');
    }).
    filter(tab => {
      let request = tab.get('request');
      return request.id === id;
    }).
    value();
  },

  /**
      * Returns an instance of the currently active tab.
      *
      * @returns {Tab} - The currenly active tab
      */
  getCurrentTab: function () {
    return this.get(this.currentTabId);
  },

  /**
      * Returns an instance of the currently active tab's request
      *
      * @returns {Request} - The request that is loaded in the currently active tab
      */
  getCurrentRequest: function () {
    let currentTab = this.getCurrentTab();
    if (currentTab) {
      return currentTab.get('request');
    }
  },

  /**
      * Serializes all tabs, including the requests currently loaded to them to save the builder state to IndexedDB
      *
      * @returns {Object} - The serialized tabs
      */
  serialize: function () {
    let tabs = this.toJSON();
    _.each(tabs, tab => {
      let tabMode = tab.mode || 'request';
      tab.request = tab.request.serialize(tabMode);
      tab.originalRequestState = tab.originalRequestState && tab.originalRequestState.serialize(tabMode);
      tab.isPreview = false;
    });
    return tabs;
  },

  /**
      * Returns the preview tab (there can only be one)
      *
      * @returns {Tab} - The preview tab
      */
  getPreviewTab: function () {
    return _.find(this.models, tab => {return tab.get('isPreview');});
  },

  /**
      * Closes the preview tab, if it exists
      */
  closePreviewTab: function () {
    let previewTab = _.find(this.models, tab => {return tab.get('isPreview');});
    previewTab && this.deleteTab(previewTab.id);
  },

  /**
      * Sets the currently active tab as busy, and saves the tab state
      *
      * @return {undefined}
      */
  engageActiveTab() {
    let currentTab = this.getCurrentTab();
    currentTab && currentTab.set('isBusy', true);
    this.handleSaveState();
  } });


/* harmony default export */ __webpack_exports__["a"] = (TabManager);

/**
                            * Indicates that a tab's property has changed
                            *
                            * @event Tab#change
                            *
                            * @param {Tab} model      - The new, changed tab
                            * @param {Object} options - The additional options passed when this change event was triggered
                            */

/**
                                * Indicates that a tab's `notifications` property has changed
                                *
                                * @event Tab#change:notifications
                                *
                                * @param {Tab} model               - The new, changed tab
                                * @param {TabNotification[]} value - The new value of the `notifications` property of the tab
                                * @param {Object} options          - The additional options passed when this event was triggered
                                */

/**
                                    * Indicates that a tab's `isGhost` property has changed
                                    *
                                    * @event Tab#change:isGhost
                                    *
                                    * @param {Tab} model      - The new, changed tab
                                    * @param {Boolean} value  - The new value of the `isGhost` property of the tab
                                    * @param {Object} options - The additional options passed when this event was triggered
                                    */

/**
                                        * Indicates that a tab's `isPreview` property has changed
                                        *
                                        * @event Tab#change:isPreview
                                        *
                                        * @param {Tab} model      - The new, changed tab
                                        * @param {Boolean} value  - The new value of the `isPreview` property of the tab
                                        * @param {Object} options - The additional options passed when this event was triggered
                                        */

/**
                                            * Indicates that a tab's `mode` property has changed
                                            *
                                            * @event Tab#change:mode
                                            *
                                            * @param {Tab} model      - The new, changed tab
                                            * @param {String} value   - The new value of the `mode` property of the tab
                                            * @param {Object} options - The additional options passed when this event was triggered
                                            */

/**
                                                * Indicates that a tab's `request` property has changed
                                                *
                                                * @event Tab#change:request
                                                *
                                                * @param {Tab} model      - The new, changed tab
                                                * @param {Request} value  - The new value of the `request` property of the tab
                                                * @param {Object} options - The additional options passed when this event was triggered
                                                */

/**
                                                    * Indicates that a tab's `initialRequest` property has changed
                                                    *
                                                    * @event Tab#change:initialRequest
                                                    *
                                                    * @param {Tab} model      - The new, changed tab
                                                    * @param {Request} value  - The new value of the `initialRequest` property of the tab
                                                    * @param {Object} options - The additional options passed when this event was triggered
                                                    */

/**
                                                        * Indicates that a tab's `initialExample` property has changed
                                                        *
                                                        * @event Tab#change:initialExample
                                                        *
                                                        * @param {Tab} model      - The new, changed tab
                                                        * @param {Request} value  - The new value of the `initialExample` property of the tab
                                                        * @param {Object} options - The additional options passed when this event was triggered
                                                        */

/**
                                                            * Indicates that a tab's `requestRevisionId` property has changed
                                                            *
                                                            * @event Tab#change:requestRevisionId
                                                            *
                                                            * @param {Tab} model      - The new, changed tab
                                                            * @param {Request} value  - The new value of the `requestRevisionId` property of the tab
                                                            * @param {Object} options - The additional options passed when this event was triggered
                                                            */
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),

/***/ 2107:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(_) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_util__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_backbone__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_backbone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_backbone__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__stores_get_store__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_ResolveVariableHelper__ = __webpack_require__(637);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_services_VariableSessionService__ = __webpack_require__(138);






/**
                                                                                        * Backbone model representing a request's body
                                                                                        *
                                                                                        * @class RequestBody
                                                                                        * @extends {Backbone.Model}
                                                                                        *
                                                                                        * @todo Incomplete
                                                                                        */
var RequestBody = __WEBPACK_IMPORTED_MODULE_1_backbone___default.a.Model.extend( /** @lends RequestBody.prototype */{
  defaults: function () {
    return {
      data: '',
      transformedData: '',
      dataToBeSent: '',
      dataMode: 'params',
      rawEditorType: 'editor',
      bodyParams: {},
      editorMode: 'html',
      language: '' };

  },

  initialize: function () {
    this.files = {};
  },

  // @TODO Not being used, remove this
  getFormDataForCurl: async function () {
    var dataAsObjects = this.get('data') || [];
    var kv, key, value;
    var variablesMap = await this.getVariablesMap();

    var body = '';
    for (var i = 0; i < dataAsObjects.length; i++) {
      key = __WEBPACK_IMPORTED_MODULE_3__utils_ResolveVariableHelper__["a" /* default */].resolve(dataAsObjects[i].key, variablesMap);
      value = __WEBPACK_IMPORTED_MODULE_3__utils_ResolveVariableHelper__["a" /* default */].resolve(dataAsObjects[i].value, variablesMap);
      var optionalAtForFile = '';
      if (dataAsObjects[i].type === 'file' && dataAsObjects[i].value && !_.isEmpty(dataAsObjects[i].value)) {
        optionalAtForFile = '@' + _.get(dataAsObjects[i], 'value[0].path', _.get(dataAsObjects[i], 'value[0].name', ''));
      }

      value = typeof value === 'string' ? __WEBPACK_IMPORTED_MODULE_0__utils_util__["a" /* default */].encode(value) : value;
      key = typeof key === 'string' ? __WEBPACK_IMPORTED_MODULE_0__utils_util__["a" /* default */].encode(key) : key;

      body += ' -F "' + key + '=' + optionalAtForFile + value + '"';
    }

    return body;
  },

  /**
      * If the data array contains a file, stores the encoded file here for use with the interceptor
      * @private
      * @param data
      */
  storeFiles: function (data) {
    _.each(data, datum => {
      if (datum.type === 'file') {
        this.storeFile(datum);
      }
    });
  },

  getVariablesMap() {
    let environmentId = Object(__WEBPACK_IMPORTED_MODULE_2__stores_get_store__["a" /* getStore */])('ActiveEnvironmentStore').id,
    globalsId = Object(__WEBPACK_IMPORTED_MODULE_2__stores_get_store__["a" /* getStore */])('ActiveGlobalsStore').id,
    workspaceId = Object(__WEBPACK_IMPORTED_MODULE_2__stores_get_store__["a" /* getStore */])('ActiveWorkspaceStore').id;

    return Object(__WEBPACK_IMPORTED_MODULE_4__modules_services_VariableSessionService__["e" /* getVariableSessionMap */])({ environmentId, globalsId, workspaceId });
  },

  storeFile: function (data) {
    var oldThis = this;
    _.each(data.value, function (file) {
      if (file instanceof Blob) {
        var reader = new FileReader();
        reader.onload = function (theFile) {
          return function (e) {
            var name = theFile.name,
            key = data.key;

            // view.appendFilenameToInput(event.currentTarget, name);

            oldThis.files[name] = {};
            oldThis.files[name].file = theFile;
          };
        }(file);
        reader.readAsArrayBuffer(file);
      }
    });
  },

  setBodyParamsString: function () {
    if (this.get('dataMode') === 'params' || this.get('dataMode') === 'urlencoded') {
      this.set('paramString', this.getBodyParamString(this.get('transformedData')));
    }
  },

  // @TODO Not being used, remove this
  setTransformedDataAndGetPayload: async function () {
    var dataMode = this.get('dataMode'),
    data = this.get('data'),
    payload = null;

    if (dataMode == 'params') {
      payload = await this.getFormDataForRowsAndSetSerializedData(data);
      this.setBodyParamsString();
    } else
    if (dataMode == 'urlencoded') {
      payload = await this.getUrlEncodedData(data);
      this.setBodyParamsString();
    } else
    if (dataMode == 'raw') {
      payload = await this.getRawDataToSend();
    } else
    {
      // binary
      payload = this.get('data');
    }
    return payload;
  },


  // @TODO Not being used, remove this
  getFormDataForRowsAndSetSerializedData: async function (rows) {
    // create a formdata object for an array of rows
    if (!rows) {
      return null;
    }
    var transformedData = [],
    serializedData = [],
    paramsBodyData = new FormData(),
    count = rows.length,
    row,key,value,
    variablesMap = await this.getVariablesMap();

    for (var j = 0; j < count; j++) {
      row = rows[j];
      key = row.key;
      if (row.enabled === false) {
        // this row is disabled. not adding
      } else
      {
        if (pm.settings.getSetting('trimKeysAndValues')) {
          key = _.trim(key);
        }

        key = __WEBPACK_IMPORTED_MODULE_3__utils_ResolveVariableHelper__["a" /* default */].resolve(key, variablesMap);

        value = row.value;

        if (row.type !== 'file') {
          value = __WEBPACK_IMPORTED_MODULE_3__utils_ResolveVariableHelper__["a" /* default */].resolve(value, variablesMap);
          if (pm.settings.getSetting('trimKeysAndValues') && row.type !== 'file') {
            value = _.trim(value);
          }

          transformedData.push({
            key: key,
            value: value });

          serializedData.push({
            key: key,
            value: value });

          paramsBodyData.append(key, value);
        } else
        if (row.type === 'file' && value && value.length > 0) {
          _.each(value, actualValue => {
            paramsBodyData.append(key, actualValue, actualValue.name);
            transformedData.push({
              'key': key,
              'value': value,
              'enabled': true,
              'type': 'file',
              'mimeType': actualValue.type });


            var serialParam = {
              name: key,
              value: [],
              fileName: actualValue.name,
              type: 'file',
              mimeType: actualValue.type };


            if (actualValue && this.files[encodeURIComponent(actualValue.name)]) {
              serialParam.value.push(this.files[encodeURIComponent(actualValue.name)].file);
              serializedData.push(serialParam);
            }
          });
        }
      }
    }
    this.set('transformedData', transformedData);
    this.set('serializedData', serializedData);

    if (count == 0) {
      // make sure a blank FormData object isn't returned if there are no rows
      return null;
    }

    return paramsBodyData;
  },

  // @TODO Not being used, remove this
  getUrlEncodedData: async function (data) {
    var transformedData = [];
    let encodedData = '';
    var variablesMap = await this.getVariablesMap();

    if (!_.isArray(data)) {
      return '';
    }

    _.forEach(data, item => {
      let { key, value, enabled } = item;

      if (enabled === false || !key) {
        return;
      }

      if (pm.settings.getSetting('trimKeysAndValues')) {
        key = _.trim(key);
        value = _.trim(value);
      }

      key = __WEBPACK_IMPORTED_MODULE_3__utils_ResolveVariableHelper__["a" /* default */].resolve(key, variablesMap);
      key = encodeURIComponent(key);
      key = key.replace(/%20/g, '+');

      value = __WEBPACK_IMPORTED_MODULE_3__utils_ResolveVariableHelper__["a" /* default */].resolve(value, variablesMap);
      value = encodeURIComponent(value);
      value = value.replace(/%20/g, '+');

      encodedData += key + '=' + value + '&';
      transformedData.push({
        key: key,
        value: value });

    });
    this.set('transformedData', transformedData);
    encodedData = encodedData.substr(0, encodedData.length - 1);
    return encodedData;
  },

  // @TODO Not being used, remove this
  getBodyForCurl: async function () {
    var dataMode = this.get('dataMode');
    var preview;

    if (dataMode !== 'params' && dataMode !== 'urlencoded') {
      // raw or binary
      var data = this.get('data');

      // if not a string, return without -d
      if (typeof data !== 'string') {
        return '';
      }
      preview = __WEBPACK_IMPORTED_MODULE_3__utils_ResolveVariableHelper__["a" /* default */].resolve(data, (await this.getVariablesMap()));
      preview = preview.replace(/'/g, '\'\\\'\'');
      return ' -d \'' + preview + '\'';
    } else
    if (dataMode === 'params') {
      return await this.getFormDataForCurl();
    } else
    if (dataMode === 'urlencoded') {
      return await this.getUrlEncodedBodyForCurl();
    }
  },

  // @TODO Not being used, remove this
  getUrlEncodedBodyForCurl: async function () {
    let data = this.get('data');
    let variablesMap = await this.getVariablesMap();
    let enabledParams = _.filter(data, param => {
      return !(param.enabled === false);
    });

    let retVal = _.map(enabledParams, param => {
      return __WEBPACK_IMPORTED_MODULE_0__utils_util__["a" /* default */].encode(__WEBPACK_IMPORTED_MODULE_3__utils_ResolveVariableHelper__["a" /* default */].resolve(param.key, variablesMap)) +
      '=' +
      __WEBPACK_IMPORTED_MODULE_0__utils_util__["a" /* default */].encode(__WEBPACK_IMPORTED_MODULE_3__utils_ResolveVariableHelper__["a" /* default */].resolve(param.value, variablesMap));
    }).join('&');

    return ' -d \'' + retVal + '\'';
  },

  // Fixed
  getBodyParamString: function (params) {
    var paramsLength = params.length;
    var paramArr = [];
    for (var i = 0; i < paramsLength; i++) {
      var p = params[i];
      if (p.key && p.key !== '') {
        paramArr.push(p.key + '=' + p.value);
      }
    }
    return paramArr.join('&');
  },

  getDataMode: function () {
    return this.get('dataMode');
  },

  loadData: function (mode, data, asObjects) {
    this.set('dataMode', mode);
    this.set('asObjects', asObjects);

    if (mode !== 'raw') {
      if (asObjects) {
        var cData = _.clone(data);

        if (mode === 'params') {
          // Change made through an event in RequestBodyFormDataEditor
          this.set('data', cData);
          this.set('dataAsObjects', cData);
          this.set('dataToBeSent', cData);
          this.set('serializedData', cData);
        } else
        {
          this.set('data', cData);
          this.set('dataToBeSent', cData);
          this.set('dataAsObjects', cData);
        }
      } else
      {
        var params = __WEBPACK_IMPORTED_MODULE_0__utils_util__["a" /* default */].getBodyVars(data, false);
        var cParams = _.clone(params);
        this.set('data', cParams);
        this.set('dataToBeSent', cParams);
        this.set('dataAsObjects', cParams);
      }
      this.trigger('change:dataAsObjects');
    } else
    {
      // No need for objects
      this.set('data', _.clone(data));
      this.set('dataToBeSent', _.clone(data));
    }

    // console.log("loadData: dataToBeSent", this.get("dataToBeSent"));
    this.trigger('dataLoaded', this);
    this.trigger('change:data');
  },

  // TODO Store transformedData
  getUrlEncodedBody: async function () {
    var rows, count, j;
    var row, key, value;
    var urlEncodedBodyData = '';
    var transformedData = [];
    var variablesMap = await this.getVariablesMap();

    rows = this.get('data');
    count = rows.length;

    if (count > 0) {
      for (j = 0; j < count; j++) {
        row = rows[j];
        value = row.value;
        key = row.key;
        if (row.enabled === false) {
          // row is disabled. not adding
        } else
        {
          if (pm.settings.getSetting('trimKeysAndValues')) {
            value = _.trim(value);
          }

          value = __WEBPACK_IMPORTED_MODULE_3__utils_ResolveVariableHelper__["a" /* default */].resolve(value, variablesMap);
          value = encodeURIComponent(value);
          value = value.replace(/%20/g, '+');

          key = __WEBPACK_IMPORTED_MODULE_3__utils_ResolveVariableHelper__["a" /* default */].resolve(key, variablesMap);
          key = encodeURIComponent(key);
          key = key.replace(/%20/g, '+');

          if (pm.settings.getSetting('trimKeysAndValues')) {
            key = _.trim(key);
          }

          urlEncodedBodyData += key + '=' + value + '&';

          transformedData.push({
            'key': key,
            'value': value });

        }
      }

      urlEncodedBodyData = urlEncodedBodyData.substr(0, urlEncodedBodyData.length - 1);

      this.set('transformedData', transformedData);

      return urlEncodedBodyData;
    } else
    {
      return false;
    }
  },

  // @TODO Not being used, remove this
  getRawDataToSend: async function () {
    var tData = __WEBPACK_IMPORTED_MODULE_3__utils_ResolveVariableHelper__["a" /* default */].resolve(this.get('data'), (await this.getVariablesMap()));
    this.set('transformedData', tData);
    return tData;
  },

  // TODO Store transformedData
  // @TODO Not being used, remove this
  getFormDataBody: async function () {
    var rows, count, j;
    var i;
    var row, key, value;
    var paramsBodyData = new FormData();
    var transformedData = [];
    var variablesMap = await this.getVariablesMap();

    rows = this.get('data');

    if (rows) {
      count = rows.length;
    } else
    {
      count = 0;
    }


    if (count > 0) {
      for (j = 0; j < count; j++) {
        row = rows[j];
        key = row.key;
        if (row.enabled === false) {
          // this row is disabled. not adding
        } else
        {
          if (pm.settings.getSetting('trimKeysAndValues')) {
            key = _.trim(key);
          }

          key = __WEBPACK_IMPORTED_MODULE_3__utils_ResolveVariableHelper__["a" /* default */].resolve(key, variablesMap);

          value = row.value;
          value = __WEBPACK_IMPORTED_MODULE_3__utils_ResolveVariableHelper__["a" /* default */].resolve(value, variablesMap);

          if (pm.settings.getSetting('trimKeysAndValues')) {
            value = _.trim(value);
          }

          paramsBodyData.append(key, value);

          transformedData.push({
            'key': key,
            'value': value });

        }
      }

      this.set('transformedData', transformedData);

      return paramsBodyData;
    } else
    {
      return false;
    }
  },

  getDataAsKvPairs: function (dataPairs) {
    if (!dataPairs || dataPairs.length === 0) {
      return {};
    }
    var count = dataPairs.length;
    var kvpairs = {};
    for (var i = 0; i < count; i++) {
      if (kvpairs.hasOwnProperty(dataPairs[i].key)) {
        // 2 properties with same key. convert to array
        if (kvpairs[dataPairs[i].key] instanceof Array) {
          kvpairs[dataPairs[i].key] = kvpairs[dataPairs[i].key].concat(dataPairs[i].value);
        } else
        {
          kvpairs[dataPairs[i].key] = [kvpairs[dataPairs[i].key], dataPairs[i].value];
        }
      } else
      {
        kvpairs[dataPairs[i].key] = dataPairs[i].value;
      }
    }

    return kvpairs;
  },

  // Note: Used inside collection runner
  // TODO Clean request body management first
  // This is horribly wrong. Need to fix this properly
  // NOT USED ANYMORE
  // @TODO Not being used, remove this
  setDataForXHR: async function () {
    var mode = this.get('dataMode');
    if (mode === 'params') {
      this.set('data', this.get('dataAsObjects'));
      var formdata = await this.getFormDataBody();
      this.set('data', formdata);
      this.set('dataToBeSent', formdata);
    } else
    if (mode === 'urlencoded') {
      var paramdata = this.getUrlEncodedBody();

      // console.log("param data is", paramdata);
      this.set('data', paramdata);
      this.set('dataToBeSent', paramdata);
    } else
    if (mode === 'raw') {
      // TODO Store transformedData
      var data = this.get('data'); // MUST be a string!
      if (typeof data !== 'string') {
        data = '';
      }

      var transformedData = __WEBPACK_IMPORTED_MODULE_3__utils_ResolveVariableHelper__["a" /* default */].resolve(data, (await this.getVariablesMap()));
      this.set('transformedData', transformedData);
      this.set('dataToBeSent', transformedData);
    }
  } });


/* harmony default export */ __webpack_exports__["a"] = (RequestBody);

/**
                             * Indicates that the response body's property has changed
                             *
                             * @event ResponseBody#change
                             *
                             * @param {ResponseBody} model - The new, changed response body
                             * @param {Object} options     - The additional options passed when this change event was triggered
                             */
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),

/***/ 2108:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(_) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants_AppSettingsDefaults__ = __webpack_require__(439);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_services_APIService__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_util__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_HttpService__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_controllers_CurrentUserController__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modules_services_AnalyticsService__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils_ShellHelper__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__modules_model_event__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_domain__ = __webpack_require__(2109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_domain___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_domain__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__constants_InfobarConstants__ = __webpack_require__(254);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__controllers_Infobar__ = __webpack_require__(532);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_backbone__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_backbone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_backbone__);













const APP_UPDATE = 'appUpdate',
APP_UPDATE_EVENTS = 'app-update-events',
CHECK_FOR_ELECTRON_VERSION_UPDATED = 'checkForElectronVersionUpdated',
UPDATE_ELECTRON = 'updateElectron',
APPLY_ELECTRON_UPDATE = 'applyElectronUpdate',

ELECTRON_UPDATE_ERROR = 'electronAppUpdateError',
ELECTRON_UPDATE_NOT_AVAILABLE = 'electronAppUpdateNotAvailable',
ELECTRON_UPDATE_DOWNLOADED = 'electronAppUpdateDownloaded',
CHECK_FOR_ELECTRON_VERSION_UPDATE = 'checkForElectronVersionUpdate',
CHECK_FOR_ELECTRON_UPDATE = 'checkForElectronUpdate',
ELECTRON_VERSION_UPDATED = 'electronVersionUpdated';


const AUTO_UPDATE_TIMER = 24 * 3600 * 1000, // 24 hours
NO_UPDATE_BANNER_TIMEOUT = 7 * 24 * 3600 * 1000, // A week
NOT_UPDATED_BANNER_ID = 'not-updated-banner',
NOT_UPDATED_MESG = {
  _id: NOT_UPDATED_BANNER_ID, // not using id since that will be overridden
  message: 'An update has been downloaded for Postman. Restart now to install the update.',
  priority: 80,
  type: __WEBPACK_IMPORTED_MODULE_9__constants_InfobarConstants__["c" /* SUCCESS */],
  isDismissable: true,
  primaryAction: {
    label: 'Restart',
    onClick: () => {
      pm.updateNotifier.applyUpdate();
      __WEBPACK_IMPORTED_MODULE_5__modules_services_AnalyticsService__["a" /* default */].addEvent('app', 'app_restart', 'restart_banner');
    } },

  onDismiss: function (params) {
    __WEBPACK_IMPORTED_MODULE_5__modules_services_AnalyticsService__["a" /* default */].addEvent('app', 'dismiss_update_restart_banner');
  } };


var semver = __webpack_require__(381),
AppUpdateNotifier = __WEBPACK_IMPORTED_MODULE_11_backbone___default.a.Model.extend({
  defaults: function () {
    return {
      status: 'idle',
      initialized: false,
      data: null,
      changelog: null,
      isAutoDownloaded: false };

  },
  initialize: function () {
    if (window.DISABLE_UPDATES === true) {
      return;
    }

    // initialization should be idempotent
    if (this.get('initialized')) {
      return;
    }
    this.set('initialized', true);

    // migrate existing data
    if (pm.settings.getSetting('autoDownloadUpdateStatus') === 0) {
      pm.settings.setSetting('autoDownloadUpdateStatus', __WEBPACK_IMPORTED_MODULE_0__constants_AppSettingsDefaults__["a" /* default */].autoDownload.MINOR);
    }
    this.updaterEventBus = pm.eventBus.channel(APP_UPDATE_EVENTS);
    this.attachUpdaterEventsListeners();

    this.checkForVersionUpdate();

    this.version = pm.app.get('version');
    this.appId = pm.app.get('installationId');
    this.userAgent = navigator.userAgent;
    this.platform = this.getPlatform();
    this.arch = this.getArch();
    this.updateServerDomain = postman_update_server_url;

    setTimeout(() => {
      navigator.onLine && this.updateHandler();
    }, 10000); // After 10 sec

    setInterval(() => {
      // If an update is already downloaded don't check for new updates
      if (this.get('status') === 'downloaded') {
        // Show the banner if user has not restarted app for a week
        const hasCrossedNoUpdateTimeout = Date.now() - this.get('downloadedTimestamp') > NO_UPDATE_BANNER_TIMEOUT,
        isBannerAlreadyOpen = _.find(__WEBPACK_IMPORTED_MODULE_10__controllers_Infobar__["a" /* default */].infoList, { _id: NOT_UPDATED_BANNER_ID }); // same banner is already shown, don't show another

        if (hasCrossedNoUpdateTimeout && !isBannerAlreadyOpen) {
          __WEBPACK_IMPORTED_MODULE_10__controllers_Infobar__["a" /* default */].add(NOT_UPDATED_MESG);
          __WEBPACK_IMPORTED_MODULE_10__controllers_Infobar__["a" /* default */].show();
          __WEBPACK_IMPORTED_MODULE_5__modules_services_AnalyticsService__["a" /* default */].addEvent('app', 'show_update_restart_banner');
        }

        return;
      }

      navigator.onLine && this.updateHandler();
    }, AUTO_UPDATE_TIMER);
  },

  checkForVersionUpdate() {
    this.updaterEventBus.publish(Object(__WEBPACK_IMPORTED_MODULE_7__modules_model_event__["a" /* createEvent */])(CHECK_FOR_ELECTRON_VERSION_UPDATED, APP_UPDATE));
  },

  attachUpdaterEventsListeners() {
    this.updaterEventBus.subscribe((event = {}) => {
      console.log('App updater event', event); // Logging intentionally

      let eventName = event.name;
      if (eventName === ELECTRON_UPDATE_NOT_AVAILABLE) {
        this.noUpdateFound();
        return;
      }
      if (eventName === ELECTRON_UPDATE_ERROR) {
        this.onUpdateError(event.data);
        return;
      }
      if (eventName === ELECTRON_UPDATE_DOWNLOADED) {
        this.onUpdateDownloaded();
        return;
      }

      if (eventName === ELECTRON_VERSION_UPDATED) {
        this.notifyVersionUpdate(event.data);
        return;
      }

      if (eventName === CHECK_FOR_ELECTRON_UPDATE) {
        this.checkForUpdates(true);
        __WEBPACK_IMPORTED_MODULE_5__modules_services_AnalyticsService__["a" /* default */].addEvent('app', 'check_update', 'menu');
        return;
      }
    });
  },

  updateHandler() {
    // populate release notes for current version
    this.fetchReleaseNotes();
    this.checkForUpdates();
  },

  getArch: function () {
    let platform = navigator.platform;

    if (platform === 'Win32' || platform === 'Win64') {
      let userAgent = navigator.userAgent;

      if (_.includes(userAgent, 'WOW64') || _.includes(userAgent, 'Win64')) {
        return '64';
      }

      return '32';
    }

    if (_.includes(platform, 'Linux')) {
      if (_.includes(platform, '64')) {
        return '64';
      }

      return '32';
    }

    return '64';
  },

  getPlatform: function () {
    let platform = navigator.platform;

    if (platform === 'Win32' || platform === 'Win64') {
      let userAgent = navigator.userAgent;

      if (_.includes(userAgent, 'WOW64') || _.includes(userAgent, 'Win64')) {
        return 'WIN64';
      }

      return 'WIN32';
    }

    if (_.includes(platform, 'Linux')) {
      return 'LINUX';
    }

    return 'OSX';
  },

  onUpdateError: function (eventData = {}) {
    let error = eventData.error,
    label = this.get('isAutoDownloaded') ? 'auto_update' : 'manual_update';

    this.set({
      status: 'error',
      data: null,
      changelog: null });

    console.error('Error in update flow: ' + JSON.stringify(error));
    __WEBPACK_IMPORTED_MODULE_5__modules_services_AnalyticsService__["a" /* default */].addEvent('app', 'error', label);
  },

  applyUpdate: function () {
    this.set({ status: 'applying' });

    // Sending through bus is not recommended here
    // As, the app quits in this case which triggers a crash at times
    __WEBPACK_IMPORTED_MODULE_6__utils_ShellHelper__["a" /* default */].sendToMain(APPLY_ELECTRON_UPDATE);
  },

  onUpdateDownloaded: function () {
    this.set({
      status: 'downloaded',
      downloadedTimestamp: Date.now() });

    pm.mediator.trigger('closeSettingsModal');
    !this.get('isAutoDownloaded') && pm.mediator.trigger('showUpdateModal');
  },

  notifyVersionUpdate: function (data = {}) {
    setTimeout(() => {
      let currentVersion = data.currentVersion,
      currentPlatform = window.process.platform + '-' + window.process.arch;

      // Show alert message
      pm.toasts.success('Successfully updated to version ' + currentVersion);

      // Send analytics event
      __WEBPACK_IMPORTED_MODULE_5__modules_services_AnalyticsService__["a" /* default */].addEvent('app', 'updated', null, null, null, { noActiveWorkspace: true });

      // Notify update information to the server.
      __WEBPACK_IMPORTED_MODULE_4__modules_controllers_CurrentUserController__["a" /* default */].
      get().
      then((user = {}) => {
        Object(__WEBPACK_IMPORTED_MODULE_1__modules_services_APIService__["n" /* NotifyServerOfVersionChange */])(user, currentVersion + '-' + currentPlatform);
      });
    }, 5000);
  },

  downloadUpdate: function (isSilent = false, options = {}) {

    this.set({
      status: 'downloading',
      isAutoDownloaded: _.isBoolean(isSilent) ? isSilent : false });


    this.getAdditionalParams(params => {
      let data = this.get('data'),
      eventPayload = {
        channel: window.RELEASE_CHANNEL || 'stable',
        version: this.version,
        appId: this.appId,
        userAgent: this.userAgent,
        platform: this.platform,
        arch: this.arch,
        downloadURL: options.downloadURL || data && data.url,
        updateServerDomain: this.updateServerDomain,
        additionalParamsString: params };

      __WEBPACK_IMPORTED_MODULE_4__modules_controllers_CurrentUserController__["a" /* default */].
      get().
      then((user = {}) => {
        _.assign(eventPayload, { userId: user.id });
        this.updaterEventBus.publish(Object(__WEBPACK_IMPORTED_MODULE_7__modules_model_event__["a" /* createEvent */])(UPDATE_ELECTRON, APP_UPDATE, eventPayload));
      }).
      catch(e => {
        this.updaterEventBus.publish(Object(__WEBPACK_IMPORTED_MODULE_7__modules_model_event__["a" /* createEvent */])(UPDATE_ELECTRON, APP_UPDATE, eventPayload));
      });
    });
  },

  noUpdateFound: function () {
    this.set({
      status: 'updateNotAvailable',
      data: null });

  },

  updateFoundWithVersion: function (data) {
    this.set({
      status: 'updateAvailable',
      data: data,
      changelog: null });

    this.fetchChangeLog();
  },

  shouldAutoDownload: function (version) {
    let versionDiff = 'major', // Also the reason for keeping the fail proof, hence defaults to major
    autoDownloadUpdateStatus = pm.settings.getSetting('autoDownloadUpdateStatus') || __WEBPACK_IMPORTED_MODULE_0__constants_AppSettingsDefaults__["a" /* default */].autoDownload.MINOR;

    try {
      versionDiff = semver.diff(pm.app.get('version'), version);
    }

    // throws exception in case of wrong version from ARS. should not be the case as ARS also uses semver,
    // happens only if the data.version node is not available.
    catch (e) {
      console.log(e);
    } finally
    {
      if (autoDownloadUpdateStatus === __WEBPACK_IMPORTED_MODULE_0__constants_AppSettingsDefaults__["a" /* default */].autoDownload.MINOR) {
        return ['minor', 'preminor', 'patch', 'prepatch', 'prerelease'].includes(versionDiff);
      }
      return autoDownloadUpdateStatus === __WEBPACK_IMPORTED_MODULE_0__constants_AppSettingsDefaults__["a" /* default */].autoDownload.ALL;
    }
  },

  getAdditionalParams: function (cb) {
    __WEBPACK_IMPORTED_MODULE_4__modules_controllers_CurrentUserController__["a" /* default */].
    get().
    then((user = {}) => {
      let deviceInfo = pm.app && pm.app.getDeviceInfo(),
      userId = _.toString(user.id) || '0',
      syncEnabled = user.syncEnabled || false,
      teamPlan = _.get(user, 'organizations.0.plan', '');

      cb && cb([
      `installationId=${_.get(deviceInfo, 'id')}`,
      `userId=${userId}`,
      `syncEnabled=${syncEnabled}`,
      `teamPlan=${teamPlan}`].
      join('&'));
    }).
    catch(e => {

      // Don't block if anything fails.
      return '';
    });
  },

  getUpdateStatusURL: function (cb) {
    this.getAdditionalParams(params => {
      let updateChannel = _.includes(['prod', 'stage'], window.RELEASE_CHANNEL) ? 'stable' : window.RELEASE_CHANNEL,
      appReleaseServerEndpoint = postman_update_server_url + 'update/status?' + [
      `channel=${updateChannel}`,
      `currentVersion=${this.version}`,
      `arch=${this.arch}`,
      `platform=${this.platform.toLowerCase()}`,
      params].
      join('&');

      cb && cb(appReleaseServerEndpoint);
    });
  },

  changelogEndpoint: function (cb) {
    this.getAdditionalParams(params => {
      let updateChannel = _.includes(['prod', 'stage'], window.RELEASE_CHANNEL) ? 'stable' : window.RELEASE_CHANNEL;

      cb && cb(postman_update_server_url + 'changelog?' + [
      `channel=${updateChannel}`,
      `platform=${this.platform.toLowerCase()}`,
      params].
      join('&'));
    });
  },

  fetchReleaseNotes: function () {
    let currentVersion = this.version;
    this.changelogEndpoint(url => {
      __WEBPACK_IMPORTED_MODULE_3__utils_HttpService__["a" /* default */].request(url + `&to=${currentVersion}`).then(({ body, status }) => {
        if (status === 200) {
          this.set({ releaseNotes: __WEBPACK_IMPORTED_MODULE_2__utils_util__["a" /* default */].constructsReleaseNotes(body.changelog) });
        }
      }).catch(() => {
        _.noop();
      });
    });
  },

  fetchChangeLog: function () {
    let currentVersion = this.version;
    this.changelogEndpoint(url => {
      __WEBPACK_IMPORTED_MODULE_3__utils_HttpService__["a" /* default */].request(url + `&from=${currentVersion}`).then(({ body, status }) => {
        if (status === 200) {
          _.isArray(body.changelog) && !_.isEmpty(body.changelog[0]) && (body.changelog[0].isLatest = true);
          this.set({ changelog: __WEBPACK_IMPORTED_MODULE_2__utils_util__["a" /* default */].constructChangelog(body.changelog) });
        }
      }).catch(() => {
        _.noop();
      });
    });
  },

  checkForUpdates: function (isManual) {
    let currentStatus = this.get('status');

    this.set({
      status: 'checking',
      data: null,
      changelog: null });


    if (isManual) {
      pm.mediator.trigger('closeSettingsModal');
      pm.mediator.trigger('showUpdateModal', { origin: 'manual' });
    }

    this.getUpdateStatusURL(url => {
      __WEBPACK_IMPORTED_MODULE_3__utils_HttpService__["a" /* default */].request(url).then(({ body, status }) => {
        if (status === 200) {
          if (!isManual && this.shouldAutoDownload(body.version)) {
            // silently download the update
            this.downloadUpdate(true, { downloadURL: body.url });
          } else {
            // either it is manual update or it is auto-update but version is major and settings is set to minor

            // show the modal for update and also show the badge over settings icon
            this.updateFoundWithVersion(body);

            // do not show this modal if the user has dismissed it already once
            if (this.get('updateModalDismissed')) {
              return;
            }

            !isManual && pm.mediator.trigger('showUpdateModal', { origin: 'auto' });
            __WEBPACK_IMPORTED_MODULE_5__modules_services_AnalyticsService__["a" /* default */].addEvent('app', 'view_update_available_modal', isManual ? 'manual' : 'auto');
          }
        } else
        if (status === 204) {
          this.noUpdateFound();
        }
      }).catch(err => {
        console.warn('Error while checking for update', err);
        this.set({
          status: 'error',
          data: null,
          changelog: null });

      });
    });
  } });


/* harmony default export */ __webpack_exports__["a"] = (AppUpdateNotifier);

/**
                                   * @typedef {Object} AppUpdateNotifier~releaseNotes
                                   *
                                   * @property {String} name Version name
                                   * @property {Object} notes Release notes
                                   * @property {String[]} notes.Bugfixes bugfixes in the release
                                   * @property {String[]} notes.Improvements improvements in the release
                                   * @property {String[]} notes.Features new features in the release
                                   */
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),

/***/ 2109:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// This file should be ES5 compatible
/* eslint prefer-spread:0, no-var:0, prefer-reflect:0, no-magic-numbers:0 */


module.exports = function () {
	// Import Events
	var events = __webpack_require__(38);

	// Export Domain
	var domain = {};
	domain.createDomain = domain.create = function () {
		var d = new events.EventEmitter();

		function emitError(e) {
			d.emit('error', e);
		}

		d.add = function (emitter) {
			emitter.on('error', emitError);
		};
		d.remove = function (emitter) {
			emitter.removeListener('error', emitError);
		};
		d.bind = function (fn) {
			return function () {
				var args = Array.prototype.slice.call(arguments);
				try {
					fn.apply(null, args);
				} catch (err) {
					emitError(err);
				}
			};
		};
		d.intercept = function (fn) {
			return function (err) {
				if (err) {
					emitError(err);
				} else {
					var args = Array.prototype.slice.call(arguments, 1);
					try {
						fn.apply(null, args);
					} catch (err) {
						emitError(err);
					}
				}
			};
		};
		d.run = function (fn) {
			try {
				fn();
			} catch (err) {
				emitError(err);
			}
			return this;
		};
		d.dispose = function () {
			this.removeAllListeners();
			return this;
		};
		d.enter = d.exit = function () {
			return this;
		};
		return d;
	};
	return domain;
}.call(this);

/***/ }),

/***/ 2110:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(_) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_util__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_pipelines_user_action__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_model_event__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__stores_get_store__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_controllers_CurrentUserController__ = __webpack_require__(128);




let

ElectronTCPReader = class ElectronTCPReader {

  constructor() {

    _.assign(this, {
      socketId: null,
      socketInfo: null,
      port: '5005',
      target_type: 'history',
      target_id: '',
      status: 'disconnected',
      filters: {
        url: '',
        url_disabled: '',
        methods: '',
        status_codes: '',
        content_type: '' } });



    let readerSettings = localStorage.getItem('readerSettings'),
    readerSettingsJSON = null;

    try {
      if (!_.isEmpty(readerSettings)) {
        readerSettingsJSON = JSON.parse(readerSettings);
      }
    }
    catch (e) {
      console.error('Error in parsing proxy settings');
    } finally
    {
      if (!_.isEmpty(readerSettingsJSON)) {
        _.assign(this, _.pick(['port', 'target_type', 'target_id', 'filters']));
      }
    }

    pm.appWindow.trigger('registerInternalEvent', 'proxyRequestCaptured', this.onProxyRequestCaptured, this);
    pm.appWindow.trigger('registerInternalEvent', 'proxyClosed', this.onProxyClosed, this);

    pm.appWindow.trigger('registerInternalEvent', 'proxyNotif', this.onProxyNotif, this);
  }

  save() {
    localStorage.setItem('readerSettings', JSON.stringify(_.pick(this, ['port', 'target_type', 'target_id', 'filters'])));
  }

  onProxyClosed() {
    this.stopListening();
    this.status = 'disconnected';
    pm.trigger('proxyStatusChanged', this.status);
  }

  onProxyNotif(action, result) {
    if (action == 'start') {
      pm.mediator.trigger(
      result == 'success' ? 'proxyStartSuccess' : 'proxyStartFailure');

    } else
    if (action == 'stop') {
      pm.mediator.trigger(
      result == 'success' ? 'proxyStopSuccess' : 'proxyStopFailure');

    }
  }

  onProxyRequestCaptured(requestObject) {
    var url = requestObject.url,
    method = requestObject.method,
    headers = requestObject.headers,
    data = requestObject.data;

    requestObject = {
      url: url,
      method: method,
      headers: headers,
      data: data,
      name: url };


    console.log('Recd request from proxy: ' + url + ', ' + method);
    this.addRequestObject(requestObject);
  }


  isAllowed(request) {
    var filters = this.filters;
    var methods = filters.methods.split(',');

    function trim(s) {
      return s.trim().toUpperCase();
    }

    var filterMethods = _.each(methods, trim);

    var flagUrlContains = true;
    var flagUrlDisabled = true;
    var flagUrlMethods = true;

    var result;

    // console.log("Filters are", filters);

    if (filters.url === '') {
      flagUrlContains = true;
    } else
    {
      if (request.url.search(filters.url) >= 0) {
        flagUrlContains = true;
      } else
      {
        flagUrlContains = false;
      }
    }

    if (filters.url_disabled === '') {
      flagUrlDisabled = true;
    } else
    {
      if (request.url.search(filters.url_disabled) < 0) {
        flagUrlDisabled = true;
      } else
      {
        flagUrlDisabled = false;
      }
    }

    if (filterMethods.length > 0) {
      flagUrlMethods = _.indexOf(filterMethods, request.method.toUpperCase());
    } else
    {
      flagUrlMethods = true;
    }

    result = flagUrlMethods && flagUrlDisabled && flagUrlContains;
    return result;
  }

  addRequestObject(request) {
    var target_type = this.target_type;
    var collection;
    var target_id;

    // console.log("Settings are", this.toJSON());

    if (this.isAllowed(request)) {
      // modify request for sync
      let headerData = [];
      request.headerData = _.map(_.keys(request.headers), key => {
        return {
          key,
          value: request.headers[key] };

      });

      if (request.data) {
        request.dataMode = 'raw';
      }

      if (_.find(headerData, { value: 'application/x-www-form-urlencoded' })) {
        request.dataMode = 'urlencoded';
        request.data = __WEBPACK_IMPORTED_MODULE_0__utils_util__["a" /* default */].unpackUrlEncodedData(request.data);
      }

      if (target_type === 'history') {
        let currentDate = new Date(),
        workspace = Object(__WEBPACK_IMPORTED_MODULE_3__stores_get_store__["a" /* getStore */])('ActiveWorkspaceSessionStore').workspace,
        historyCreateEvent = Object(__WEBPACK_IMPORTED_MODULE_2__modules_model_event__["a" /* createEvent */])(
        'create',
        'history',
        _.assign({ id: __WEBPACK_IMPORTED_MODULE_0__utils_util__["a" /* default */].guid(), createdAt: currentDate.toISOString(), workspace }, request));


        Object(__WEBPACK_IMPORTED_MODULE_1__modules_pipelines_user_action__["a" /* default */])(historyCreateEvent).
        catch(e => {console.log('Error in creating history through proxy', e);});
      } else
      {
        __WEBPACK_IMPORTED_MODULE_4__modules_controllers_CurrentUserController__["a" /* default */].
        get().
        then(user => {
          target_id = this.target_id;

          _.assign(request, {
            id: __WEBPACK_IMPORTED_MODULE_0__utils_util__["a" /* default */].guid(),
            collection: target_id,
            owner: user.id });


          let requestCreateEvent = {
            name: 'create_deep',
            namespace: 'request',
            data: { request },
            target: {
              model: 'collection',
              modelId: target_id } };


          Object(__WEBPACK_IMPORTED_MODULE_1__modules_pipelines_user_action__["a" /* default */])(requestCreateEvent).
          then(response => {
            if (!_.isEmpty(_.get(response, 'error'))) {
              console.error('Error in creating collection from tcp', response.error);
              return;
            }
          });
        }).
        catch(err => {
          console.error('Error while creating collection from tcp', err);
        });
      }
    }
  }

  startListening() {
    var model = this;

    var portToUse = this.port;

    pm.appWindow.sendToElectron({
      event: 'startProxy',
      data: { port: portToUse } });


    this.status = 'connected';
    pm.mediator.trigger('proxyStatusChanged', this.status);

  }

  stopListening() {
    pm.appWindow.sendToElectron({
      event: 'stopProxy',
      data: {} });

    this.status = 'disconnected';
    pm.mediator.trigger('proxyStatusChanged', this.status);
  }

  connect() {
    this.startListening();
    this.status = 'connected';
    pm.mediator.trigger('proxyStatusChanged', this.status);
  }

  disconnect() {
    this.stopListening();
    this.status = 'disconnected';
    pm.mediator.trigger('proxyStatusChanged', this.status);
    let interceptor = document.getElementsByClassName('icon-navbar-interceptor')[0];
    !_.isEmpty(interceptor) && interceptor.classList.remove('active');
  }};


/* harmony default export */ __webpack_exports__["a"] = (ElectronTCPReader);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),

/***/ 2111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(_) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_services_APIService__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_conversion_promisifiedConverter__ = __webpack_require__(522);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__controllers_Importer__ = __webpack_require__(709);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_controllers_UserController__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_controllers_WindowController__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_controllers_WindowController___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__common_controllers_WindowController__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_util__ = __webpack_require__(14);







const ProtocolHandler = {
  initialize: function (cb) {
    let channel = pm.eventBus.channel('protocol-handler');
    channel.subscribe(ProtocolHandler.onProtocolEvent);

    cb && cb(null);
  },

  onProtocolEvent: function (params) {
    __WEBPACK_IMPORTED_MODULE_4__common_controllers_WindowController___default.a.getCurrentWindow().
    then(window => {
      let currentWindowId = window.id;
      if (currentWindowId !== params.windowId) return;

      ProtocolHandler.importByURL(params.url);
    });
  },

  importByURL(url) {
    // url is postman://dsf
    let mainParts = url.split('://');
    if (mainParts[0] !== 'postman') {
      return; // some other protocol
    }

    let uriSegments = mainParts[1].split('/');

    // current support: app/collections/import/linkId
    if (uriSegments.length !== 4) {
      return;
    }
    if (uriSegments[0] === 'app' && uriSegments[1] === 'collections' && uriSegments[2] === 'import') {
      let linkId = uriSegments[3];
      __WEBPACK_IMPORTED_MODULE_3__modules_controllers_UserController__["a" /* default */].
      get().
      then(user => {
        Object(__WEBPACK_IMPORTED_MODULE_0__modules_services_APIService__["e" /* DownloadDirectoryCollection */])({ user, linkId }, (err, data) => {
          if (err) {
            pm.toasts.error('We can\'t seem to find the collection you\'re trying to import.');
            return;
          }

          let text,
          urlVars = __WEBPACK_IMPORTED_MODULE_5__utils_util__["a" /* default */].getUrlVars(url),
          referrer = _.find(urlVars, { key: 'referrer' }),
          referrerValue = referrer ? decodeURIComponent(referrer.value) : '';

          try {
            text = JSON.stringify(data);
          } catch (e) {
            console.error('ProtocolHandler: collection data is not a valid JSON', data, e);
            return;
          }

          __WEBPACK_IMPORTED_MODULE_2__controllers_Importer__["a" /* default */].importData(text, {
            origin: 'run-in-postman',
            link: url,
            referrer: referrerValue });

        });
      });
      Object(__WEBPACK_IMPORTED_MODULE_1__services_conversion_promisifiedConverter__["a" /* default */])().then(converter => {
        converter.checkImportEnvironmentFromUrl(url);
      });
    }
  } };


/* harmony default export */ __webpack_exports__["a"] = (ProtocolHandler);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),

/***/ 2116:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__in_app_messaging_InAppController__ = __webpack_require__(634);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__controllers_Infobar__ = __webpack_require__(532);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__in_app_messaging_message_transformer__ = __webpack_require__(2117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__stores_get_store__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_services_APIService__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modules_services_NotificationService__ = __webpack_require__(988);







/**
                                                                                      * @param {*} cb
                                                                                      *
                                                                                      */
function bootInAppMessaging(cb) {
  /*
                                 * Consumer of in-app messages need to register its ownn handlers with in-app
                                 * message controller. The controller just calls your handlers whenever it want to
                                 * perform different tasks. This gives the consumer flexibility and keeps the controller
                                 * unopinionated about what you should do when certain message needs to be shown.
                                 */
  Object(__WEBPACK_IMPORTED_MODULE_0__in_app_messaging_InAppController__["b" /* registerHandlers */])({

    messageHandlers: {
      toast: message => {
        let options = Object(__WEBPACK_IMPORTED_MODULE_2__in_app_messaging_message_transformer__["b" /* transformForToast */])(message);
        pm.toasts[options.level](options.text, options);
      },
      banner: message => {
        __WEBPACK_IMPORTED_MODULE_1__controllers_Infobar__["a" /* default */].add(Object(__WEBPACK_IMPORTED_MODULE_2__in_app_messaging_message_transformer__["a" /* transformForBanner */])(message));
        __WEBPACK_IMPORTED_MODULE_1__controllers_Infobar__["a" /* default */].show();
      },
      text: message => {
        Object(__WEBPACK_IMPORTED_MODULE_3__stores_get_store__["a" /* getStore */])('TextMessageStore').addNotification(message);
      } },


    actionHandlers: {
      appAPI: event => {
        pm.mediator.trigger(event);
      },

      openURL: url => {
        pm.app.openExternalLink(url);
      },

      openAuthenticatedURL: url => {
        Object(__WEBPACK_IMPORTED_MODULE_4__modules_services_APIService__["t" /* openAuthenticatedRoute */])(url);
      } },


    eventHandlers: {
      onReceive: (notification, meta) => {
        if (notification.message.type === 'text') {
          return;
        }
        Object(__WEBPACK_IMPORTED_MODULE_5__modules_services_NotificationService__["b" /* sendNotificationEvents */])([{
          notification: notification.id,
          events: [{
            key: 'received',
            value: Date.now(),
            dataType: 'timestamp' }] }],

        meta);
      },

      onView: (notification, meta) => {
        if (notification.message.type === 'text') {
          return;
        }
        Object(__WEBPACK_IMPORTED_MODULE_5__modules_services_NotificationService__["b" /* sendNotificationEvents */])([{
          notification: notification.id,
          events: [{
            key: 'viewed',
            value: Date.now(),
            dataType: 'timestamp' }] }],

        meta);
      },

      onActionClick: (notification, meta) => {
        Object(__WEBPACK_IMPORTED_MODULE_5__modules_services_NotificationService__["b" /* sendNotificationEvents */])([{
          notification: notification.id,
          events: [{
            key: `clicked_${meta.action}`,
            value: Date.now(),
            dataType: 'timestamp' }] }],

        meta);
      },

      onDrop: (notification, meta) => {
        Object(__WEBPACK_IMPORTED_MODULE_5__modules_services_NotificationService__["b" /* sendNotificationEvents */])([{
          notification: notification.id,
          events: [{
            key: 'dropped',
            value: Date.now(),
            dataType: 'timestamp' }] }],

        meta);
      },

      onDismiss: (notification, meta) => {
        Object(__WEBPACK_IMPORTED_MODULE_5__modules_services_NotificationService__["b" /* sendNotificationEvents */])([{
          notification: notification.id,
          events: [{
            key: 'dismissed',
            value: Date.now(),
            dataType: 'timestamp' }] }],

        meta);
      } } });


  Object(__WEBPACK_IMPORTED_MODULE_3__stores_get_store__["a" /* getStore */])('NotificationStore');
  pm.logger.info('InAppMessaging~boot - Success');
  cb && cb(null);
}

/* harmony default export */ __webpack_exports__["a"] = (bootInAppMessaging);

/***/ }),

/***/ 2117:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(_) {/* harmony export (immutable) */ __webpack_exports__["b"] = transformForToast;
/* harmony export (immutable) */ __webpack_exports__["a"] = transformForBanner;
/**
 * @param {*} message - message sent received from InAppController
 */
function transformForToast(message) {
  return {
    level: _.get(message, 'tag.level'),
    title: _.get(message, 'message.title'),
    text: _.get(message, 'message.text'),
    primaryAction: _.get(message, 'message.buttons.primary'),
    secondaryAction: _.get(message, 'message.buttons.secondary'),
    isDismissable: !_.get(message, 'dismiss.disabled'),
    timeout: _.get(message, 'dismiss.auto'),
    onDismiss: _.get(message, 'dismiss.onDismiss') };

}

/**
   * @param {*} message - message sent received from InAppController
   */
function transformForBanner(message) {
  return {
    message: _.get(message, 'message.text'),
    priority: _.get(message, 'message.priority') || 100,
    type: _.get(message, 'tag.level'),
    primaryAction: _.get(message, 'message.buttons.primary'),
    secondaryAction: _.get(message, 'message.buttons.secondary'),
    isDismissable: !_.get(message, 'dismiss.disabled'),
    onDismiss: _.get(message, 'dismiss.onDismiss') };

}
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),

/***/ 2118:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = bootRuntimeListeners;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_services_RuntimeRequestExecutionListener__ = __webpack_require__(2119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_services_RuntimeRequestAuthorizationListener__ = __webpack_require__(2120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_services_RuntimeConsoleEventsListener__ = __webpack_require__(2121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_services_RuntimeRequestDownloadListener__ = __webpack_require__(2122);





/**
                                                                                                     *
                                                                                                     *
                                                                                                     * @export
                                                                                                     */
function bootRuntimeListeners(cb) {
  if (!(pm && pm.eventBus)) {
    pm.logger.error('RuntimeListeners~boot- Failed', new Error('Could not initialize runtime listeners. Event bus not initialized'));
    cb();
    return;
  }

  pm.eventBus.channel('postman-runtime').subscribe(__WEBPACK_IMPORTED_MODULE_0__modules_services_RuntimeRequestExecutionListener__["a" /* handleRequestExecutionEvents */]);
  pm.eventBus.channel('postman-runtime').subscribe(__WEBPACK_IMPORTED_MODULE_1__modules_services_RuntimeRequestAuthorizationListener__["a" /* handleRequestAuthorizationEvents */]);
  pm.eventBus.channel('postman-runtime').subscribe(__WEBPACK_IMPORTED_MODULE_2__modules_services_RuntimeConsoleEventsListener__["a" /* handleConsoleLogEvents */]);
  pm.eventBus.channel('postman-runtime').subscribe(__WEBPACK_IMPORTED_MODULE_3__modules_services_RuntimeRequestDownloadListener__["a" /* handleRequestDownloadEvent */]);

  pm.logger.info('RuntimeListeners~boot- Success');
  cb();
}

/***/ }),

/***/ 2119:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = handleRequestExecutionEvents;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model_event__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stores_get_store__ = __webpack_require__(8);



const NAMESPACE_REQUEST_EXECUTION = 'requestexecution';

let requestExecutionEventHandlers = {
  error(event, executionStore) {
    let eventData = Object(__WEBPACK_IMPORTED_MODULE_0__model_event__["d" /* getEventData */])(event);

    executionStore.setError({
      phase: eventData.phase,
      error: eventData.error });

  },

  exception(event) {
    let eventData = Object(__WEBPACK_IMPORTED_MODULE_0__model_event__["d" /* getEventData */])(event),
    exception = eventData.error;

    pm.toasts.error('Something went wrong while running your scripts. Check Postman Console for more info.', { dedupeId: eventData.id });

    pm.console.error('exception', { message: `${exception.name} | ${exception.message}` });
    console.warn(`Error running scripts: ${exception.name} | ${exception.message}`, exception);
  },

  requestDispatched(event, executionStore) {
    let eventData = Object(__WEBPACK_IMPORTED_MODULE_0__model_event__["d" /* getEventData */])(event);

    executionStore.updateDispatchedRequest(eventData.request);
  },

  responseMetaReceived(event, executionStore) {
    let eventData = Object(__WEBPACK_IMPORTED_MODULE_0__model_event__["d" /* getEventData */])(event);

    executionStore.updateResponseMeta(eventData.meta);
  },

  responseHeadersReceived(event, executionStore) {
    let eventData = Object(__WEBPACK_IMPORTED_MODULE_0__model_event__["d" /* getEventData */])(event);

    executionStore.updateResponseHeaders(eventData.responseHeaders);
  },

  responseBodyReceived(event, executionStore) {
    let eventData = Object(__WEBPACK_IMPORTED_MODULE_0__model_event__["d" /* getEventData */])(event);

    executionStore.updateResponseBody(eventData.responseBody);
  },

  cookiesReceived(event, executionStore) {
    let eventData = Object(__WEBPACK_IMPORTED_MODULE_0__model_event__["d" /* getEventData */])(event);

    executionStore.updateCookies(eventData.cookies);
  },

  assertionsReceived(event, executionStore) {
    let eventData = Object(__WEBPACK_IMPORTED_MODULE_0__model_event__["d" /* getEventData */])(event);

    executionStore.addAssertions(eventData.assertions);
  },

  finished(event, executionStore) {
    executionStore.setFinished();
  },

  terminated(event) {
    let eventData = Object(__WEBPACK_IMPORTED_MODULE_0__model_event__["d" /* getEventData */])(event);

    // do not remove by origin, only remove by execution id
    // removing by origin might cause race conditions
    Object(__WEBPACK_IMPORTED_MODULE_1__stores_get_store__["a" /* getStore */])('RequestExecutionStore').remove(eventData.id);
  } };


/**
        *
        *
        * @export
        */
function handleRequestExecutionEvents(event) {
  if (Object(__WEBPACK_IMPORTED_MODULE_0__model_event__["g" /* getEventNamespace */])(event) !== NAMESPACE_REQUEST_EXECUTION) {
    return;
  }

  let eventData = Object(__WEBPACK_IMPORTED_MODULE_0__model_event__["d" /* getEventData */])(event),
  executionStore = Object(__WEBPACK_IMPORTED_MODULE_1__stores_get_store__["a" /* getStore */])('RequestExecutionStore').find(eventData.id);

  if (!executionStore) {
    return;
  }

  requestExecutionEventHandlers[Object(__WEBPACK_IMPORTED_MODULE_0__model_event__["f" /* getEventName */])(event)] && requestExecutionEventHandlers[Object(__WEBPACK_IMPORTED_MODULE_0__model_event__["f" /* getEventName */])(event)](event, executionStore);
}

/***/ }),

/***/ 2120:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = handleRequestAuthorizationEvents;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model_event__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stores_get_store__ = __webpack_require__(8);



const NAMESPACE_REQUEST_EXECUTION = 'requestauth';

let requestAuthorizationHandler = {
  authorizedRequest(event, executionItemStore) {
    // update the authorized request
    executionItemStore.updateDispatchedRequest(event.data.authorizedRequest);

    // need to give this alert that it got added
    pm.toasts.success('Request headers were successfully updated with authorization data for preview.');
  } };


/**
        *
        *
        * @export
        */
function handleRequestAuthorizationEvents(event) {
  // invalid/unrelated event
  if (!(event && event.data && Object(__WEBPACK_IMPORTED_MODULE_0__model_event__["g" /* getEventNamespace */])(event) === NAMESPACE_REQUEST_EXECUTION)) {
    return;
  }

  // bail out if event is unrecognized
  if (!requestAuthorizationHandler[Object(__WEBPACK_IMPORTED_MODULE_0__model_event__["f" /* getEventName */])(event)]) {
    return;
  }

  let executionStore = Object(__WEBPACK_IMPORTED_MODULE_1__stores_get_store__["a" /* getStore */])('RequestExecutionStore'),
  execution = executionStore.findByOrigin(event.data.info.origin);

  // request was not from this window, or no longer present
  if (!execution) {
    return;
  }

  if (event.data.error) {
    pm.toasts.error('Error in authorizing the request');
  }

  requestAuthorizationHandler[Object(__WEBPACK_IMPORTED_MODULE_0__model_event__["f" /* getEventName */])(event)](event, execution);
}

/***/ }),

/***/ 2121:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = handleConsoleLogEvents;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model_event__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_services_VariableSessionService__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__stores_get_store__ = __webpack_require__(8);




let consoleEventListeners = {
  net(event) {
    if (!pm || !pm.console) {
      return;
    }

    let eventData = Object(__WEBPACK_IMPORTED_MODULE_0__model_event__["d" /* getEventData */])(event);

    if (!(eventData && eventData.cursor)) {
      return;
    }

    let payload = { request: eventData.request };

    eventData.response && (payload.response = eventData.response);

    pm.console.net(eventData.cursor.httpRequestId, payload);
  },

  netError(event) {
    if (!pm || !pm.console) {
      return;
    }

    let eventData = Object(__WEBPACK_IMPORTED_MODULE_0__model_event__["d" /* getEventData */])(event);

    if (!(eventData && eventData.cursor)) {
      return;
    }

    pm.console.netErr(eventData.cursor.httpRequestId, eventData.error, {
      request: eventData.request,
      response: eventData.response });

  },

  log(event) {
    if (!pm || !pm.console) {
      return;
    }

    let eventData = Object(__WEBPACK_IMPORTED_MODULE_0__model_event__["d" /* getEventData */])(event);

    if (!(eventData && eventData.cursor)) {
      return;
    }

    pm.console.log(eventData.cursor, eventData.level, ...eventData.messages);
  } };


/**
        *
        *
        * @export
        * @param {*} event
        */
function handleConsoleLogEvents(event) {
  if (!(event && Object(__WEBPACK_IMPORTED_MODULE_0__model_event__["g" /* getEventNamespace */])(event) === 'console')) {
    return;
  }

  let eventData = Object(__WEBPACK_IMPORTED_MODULE_0__model_event__["d" /* getEventData */])(event),
  executionStore = Object(__WEBPACK_IMPORTED_MODULE_2__stores_get_store__["a" /* getStore */])('RequestExecutionStore').find(eventData.id);

  if (!executionStore) {
    return;
  }

  consoleEventListeners[Object(__WEBPACK_IMPORTED_MODULE_0__model_event__["f" /* getEventName */])(event)] && consoleEventListeners[Object(__WEBPACK_IMPORTED_MODULE_0__model_event__["f" /* getEventName */])(event)](event);
}

/***/ }),

/***/ 2122:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = handleRequestDownloadEvent;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model_event__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stores_get_store__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_services_filesystem__ = __webpack_require__(440);




const NAMESPACE_REQUEST_EXECUTION = 'requestexecution';

let requestExecutionEventHandlers = {
  finished(event) {
    if (!event) {
      return;
    }

    let executionStore = Object(__WEBPACK_IMPORTED_MODULE_1__stores_get_store__["a" /* getStore */])('RequestExecutionStore').find(event.data && event.data.id);

    if (!executionStore || !executionStore.download) {
      return;
    }

    let stream = executionStore.responseStream,
    contentInfo = executionStore.responseContentInfo;

    Object(__WEBPACK_IMPORTED_MODULE_2__models_services_filesystem__["c" /* saveAndOpenFileForResponse */])(contentInfo, stream, err => {
      if (!err) {
        pm.toasts.success('Downloaded Response');
      }
    });
  } };


/**
        *
        *
        * @export
        */
function handleRequestDownloadEvent(event) {
  if (Object(__WEBPACK_IMPORTED_MODULE_0__model_event__["g" /* getEventNamespace */])(event) !== NAMESPACE_REQUEST_EXECUTION) {
    return;
  }

  requestExecutionEventHandlers[Object(__WEBPACK_IMPORTED_MODULE_0__model_event__["f" /* getEventName */])(event)] && requestExecutionEventHandlers[Object(__WEBPACK_IMPORTED_MODULE_0__model_event__["f" /* getEventName */])(event)](event);
}

/***/ }),

/***/ 2123:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 24:
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ 36:
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ 399:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(_) {/* harmony export (immutable) */ __webpack_exports__["a"] = mergeMutations;
/**
 * Imports mutations from source to destination
 * @param {Object} destination
 * @param {Object} source
 */
function mergeMutations(destination, source = {}) {
  _.forEach(source.compacted, mutation => {
    destination.addMutation(mutation);
  });
  _.forEach(source.stream, mutation => {
    destination.addMutation(mutation);
  });
  return destination;
}
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),

/***/ 400:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(_) {/* harmony export (immutable) */ __webpack_exports__["a"] = initializeConfigurations;
/* unused harmony export initializeServices */
/* unused harmony export subscribeToModelEvents */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_Configuration__ = __webpack_require__(401);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_FeatureFlags__ = __webpack_require__(404);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_model_event__ = __webpack_require__(5);





let servicesMap = [
__WEBPACK_IMPORTED_MODULE_0__services_Configuration__["a" /* default */],
__WEBPACK_IMPORTED_MODULE_1__services_FeatureFlags__["a" /* default */]];


/**
                * Initializes the configuration service
                *
                * @param {Function} cb
                */
function initializeConfigurations(cb) {
  initializeServices().
  then(({ configService, featureFlagService }) => {
    pm.configs = configService;
    pm.features = featureFlagService;
    pm.logger.info('bootConfigurations~initialize - Success');
    cb && cb(null);
  }).
  catch(e => {
    pm.logger.error('bootConfigurations~initialize - Failed', e);
    cb & cb(e);
  });
}

/**
   * Initializes the configuration caches
   */
function initializeServices() {
  return Promise.all(_.map(servicesMap, s => {
    let service = new s();
    subscribeToModelEvents(service, service._getLayerNamespaces());
    return Promise.resolve(service);
  })).
  then(values => {
    return {
      configService: values[0],
      featureFlagService: values[1] };

  });
}

/**
   * Subscribes the caches to the model-events on the event bus
   *
   * @param {*} cache
   * @param {*} namespaces
   */
function subscribeToModelEvents(service, namespaces) {
  pm.eventBus.channel('model-events').subscribe(function (event) {
    Object(__WEBPACK_IMPORTED_MODULE_2__modules_model_event__["i" /* processEvent */])(event, ['updated'], function (event, cb) {
      let eventNamespace = Object(__WEBPACK_IMPORTED_MODULE_2__modules_model_event__["g" /* getEventNamespace */])(event),
      eventName = Object(__WEBPACK_IMPORTED_MODULE_2__modules_model_event__["f" /* getEventName */])(event);

      if (!_.includes(namespaces, eventNamespace)) {
        return cb && cb();
      }

      // Bail out if any other action except updated
      if (eventName !== 'updated') {
        return cb && cb();
      }

      // Invalidate the cache if changes are made
      service.invalidateCache();
      cb && cb();
    });
  });
}
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),

/***/ 401:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseConfigurationService__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_controllers_UserConfigurationController__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_controllers_DefaultConfigurationController__ = __webpack_require__(402);


let

Configuration = class Configuration extends __WEBPACK_IMPORTED_MODULE_0__BaseConfigurationService__["a" /* default */] {constructor(...args) {var _temp;return _temp = super(...args), this.
    layers = {
      user: {
        controller: __WEBPACK_IMPORTED_MODULE_1__modules_controllers_UserConfigurationController__["a" /* default */],
        namespace: 'userconfigs' },

      app: {
        controller: __WEBPACK_IMPORTED_MODULE_2__modules_controllers_DefaultConfigurationController__["a" /* default */],
        namespace: 'defaultconfigs' } }, this.




    resolutionOrder = ['app', 'user'], _temp;} // The order in which the layers will be resolved
};

/* harmony default export */ __webpack_exports__["a"] = (Configuration);

/***/ }),

/***/ 402:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
let defaultConfiguration = __webpack_require__(403);

/* harmony default export */ __webpack_exports__["a"] = ({
  getAll: function () {
    return Promise.resolve(defaultConfiguration);
  } });

/***/ }),

/***/ 403:
/***/ (function(module, exports) {

module.exports = {"editor.requestEditorLayoutName":"layout-1-column","request.autoPersistVariables":true,"user.plansToAllowUpgrade":[],"workspace.visibilityAvailablePlans":[],"editor.openInNew":false}

/***/ }),

/***/ 404:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseConfigurationService__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_controllers_UserFeatureFlagController__ = __webpack_require__(382);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_controllers_DefaultFeatureFlagController__ = __webpack_require__(405);


let

FeatureFlags = class FeatureFlags extends __WEBPACK_IMPORTED_MODULE_0__BaseConfigurationService__["a" /* default */] {constructor(...args) {var _temp;return _temp = super(...args), this.
    layers = {
      user: {
        controller: __WEBPACK_IMPORTED_MODULE_1__modules_controllers_UserFeatureFlagController__["a" /* default */],
        namespace: 'userfeatureflags' },

      app: {
        controller: __WEBPACK_IMPORTED_MODULE_2__modules_controllers_DefaultFeatureFlagController__["a" /* default */],
        namespace: 'defaultfeatureflags' } }, this.




    resolutionOrder = ['app', 'user'], _temp;} // The order in which the layers will be resolved.

  isEnabled(key) {
    return super.get(key);
  }

  get() {
    return new Error('Feature Flags: Use the isEnabled API to get a flag');
  }};


/* harmony default export */ __webpack_exports__["a"] = (FeatureFlags);

/***/ }),

/***/ 405:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
let defaultFeatureFlags = __webpack_require__(406);

/* harmony default export */ __webpack_exports__["a"] = ({
  getAll: function () {
    return Promise.resolve(defaultFeatureFlags);
  } });

/***/ }),

/***/ 406:
/***/ (function(module, exports) {

module.exports = {"inviteByNonAdmin":false,"replaceElements":false}

/***/ }),

/***/ 45:
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),

/***/ 519:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export activateTrial */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "u", function() { return upgradeToPro; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return openTeam; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return openAccountSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return openTeamSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return openTeamBilling; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "t", function() { return openUserSessions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s", function() { return openUserProfile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return openNotificationPreferences; });
/* unused harmony export openPostmanProIntegration */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return openInviteUsers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return openPostmanUsages; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return openCollectionLink; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return openAuditLogs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return openEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return editEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return manageWorkspaces; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return openIntegrationBrowse; });
/* unused harmony export manageMembers */
/* unused harmony export shareWorkspace */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return openTrash; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return getEntityDetailsURL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getCollectionPublishURL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return openEnterprise; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return openArchivedCollections; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_services_APIService__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants_AppUrlConstants__ = __webpack_require__(199);



/**
                                                                 *
                                                                 */
function activateTrial() {
  Object(__WEBPACK_IMPORTED_MODULE_0__modules_services_APIService__["t" /* openAuthenticatedRoute */])(`${pm.appUrl}/dpxy/dashboard?showtrialstart=true`);
}

/**
   * @todo need to go via dashboard `/dpxy/buy'
   * openAuthenticatedRoute(`${pm.appUrl}/dpxy/buy`);
   */
function upgradeToPro(options = {}) {
  Object(__WEBPACK_IMPORTED_MODULE_0__modules_services_APIService__["t" /* openAuthenticatedRoute */])(`${pm.dashboardUrl}/purchase?quantity=${options.quantity}`);
}

/**
   *
   */
function openTeam() {
  Object(__WEBPACK_IMPORTED_MODULE_0__modules_services_APIService__["t" /* openAuthenticatedRoute */])(`${pm.appUrl}/dpxy/dashboard/teams`);
}

/**
   *
   */
function openPostmanProIntegration() {
  Object(__WEBPACK_IMPORTED_MODULE_0__modules_services_APIService__["t" /* openAuthenticatedRoute */])(`${pm.appUrl}/dpxy/dashboard/integrations/pm_pro_api/list`);
}

/**
   *
   */
function openInviteUsers() {
  Object(__WEBPACK_IMPORTED_MODULE_0__modules_services_APIService__["t" /* openAuthenticatedRoute */])(`${pm.appUrl}/dpxy/dashboard/teams`);
}

/**
   *
   */
function openAccountSettings() {
  Object(__WEBPACK_IMPORTED_MODULE_0__modules_services_APIService__["t" /* openAuthenticatedRoute */])(`${pm.appUrl}/dpxy/dashboard/profile`);
}

/**
   *
   */
function openTeamSettings() {
  Object(__WEBPACK_IMPORTED_MODULE_0__modules_services_APIService__["t" /* openAuthenticatedRoute */])(`${pm.appUrl}/dpxy/settings/team`);
}

/**
   *
   */
function openTeamBilling() {
  Object(__WEBPACK_IMPORTED_MODULE_0__modules_services_APIService__["t" /* openAuthenticatedRoute */])(`${pm.appUrl}/dpxy/billing`);
}

/**
   *
   */
function openUserSessions() {
  Object(__WEBPACK_IMPORTED_MODULE_0__modules_services_APIService__["t" /* openAuthenticatedRoute */])(`${pm.appUrl}/dpxy/dashboard/sessions`);
}

function openUserProfile() {
  Object(__WEBPACK_IMPORTED_MODULE_0__modules_services_APIService__["t" /* openAuthenticatedRoute */])(`${pm.appUrl}/dpxy/dashboard/collections/private`);
}

function openNotificationPreferences() {
  Object(__WEBPACK_IMPORTED_MODULE_0__modules_services_APIService__["t" /* openAuthenticatedRoute */])(`${pm.appUrl}/dpxy/dashboard/notifications`);
}

function openPostmanUsages() {
  Object(__WEBPACK_IMPORTED_MODULE_0__modules_services_APIService__["t" /* openAuthenticatedRoute */])(`${pm.appUrl}/dpxy/dashboard/usage`);
}

function openCollectionLink() {
  Object(__WEBPACK_IMPORTED_MODULE_0__modules_services_APIService__["t" /* openAuthenticatedRoute */])(`${pm.appUrl}/dpxy/dashboard/collections/links`);
}

function openAuditLogs() {
  Object(__WEBPACK_IMPORTED_MODULE_0__modules_services_APIService__["t" /* openAuthenticatedRoute */])(`${pm.appUrl}/dpxy/audit`);
}

function openEntity(type, id, workspaceId) {
  Object(__WEBPACK_IMPORTED_MODULE_0__modules_services_APIService__["t" /* openAuthenticatedRoute */])(getEntityDetailsURL(type, id, workspaceId));
}

function editEntity(type, id, workspaceId) {
  Object(__WEBPACK_IMPORTED_MODULE_0__modules_services_APIService__["t" /* openAuthenticatedRoute */])(`${pm.appUrl}/dpxy/${type}/${id}/edit?workspace=${workspaceId}`);
}

function manageWorkspaces() {
  Object(__WEBPACK_IMPORTED_MODULE_0__modules_services_APIService__["t" /* openAuthenticatedRoute */])(`${pm.appUrl}/dpxy/workspaces`);
}

function manageMembers(workspaceId) {
  Object(__WEBPACK_IMPORTED_MODULE_0__modules_services_APIService__["t" /* openAuthenticatedRoute */])(`${pm.appUrl}/dpxy/workspaces/${workspaceId}/edit`);
}

function shareWorkspace(workspaceId) {
  Object(__WEBPACK_IMPORTED_MODULE_0__modules_services_APIService__["t" /* openAuthenticatedRoute */])(`${pm.appUrl}/dpxy/workspaces/${workspaceId}/share`);
}

function openIntegrationBrowse(workspaceId) {
  Object(__WEBPACK_IMPORTED_MODULE_0__modules_services_APIService__["t" /* openAuthenticatedRoute */])(`${pm.appUrl}/dpxy/workspaces/${workspaceId}/integrations?view=browse`);
}

function openTrash() {
  Object(__WEBPACK_IMPORTED_MODULE_0__modules_services_APIService__["t" /* openAuthenticatedRoute */])(`${pm.appUrl}/dpxy/me/trash`);
}

function openEnterprise() {
  Object(__WEBPACK_IMPORTED_MODULE_0__modules_services_APIService__["t" /* openAuthenticatedRoute */])(`${pm.appUrl}/dpxy/me/purchase`);
}

function openArchivedCollections() {
  Object(__WEBPACK_IMPORTED_MODULE_0__modules_services_APIService__["t" /* openAuthenticatedRoute */])(`${pm.dashboardUrl}/usage/archive`);
}

/**
   *
   * @param {Strin} type
   * @param {String} id
   * @param {String} workspaceId
   */
function getEntityDetailsURL(type, id, workspaceId) {
  return `${pm.appUrl}/dpxy/${type}/${id}?workspace=${workspaceId}`;
}

/**
   *
   * @param {String} id
   * @param {String} workspaceId
   */
function getCollectionPublishURL(id, workspaceId) {
  return `${pm.appUrl}/dpxy/collections/${id}/publish?workspace=${workspaceId}`;
}



/***/ }),

/***/ 537:
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),

/***/ 635:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(_) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PmConsole; });
var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};const sendLogToConsole = function (label, message, type, data) {
  /**
                                                                                                                                                                                                                                                                                                                        * Tells the listener to sanitize and dispatch a console message event.
                                                                                                                                                                                                                                                                                                                        * The actual console message is triggered by `onConsoleMessage` event.
                                                                                                                                                                                                                                                                                                                        *
                                                                                                                                                                                                                                                                                                                        * @event Mediator#consoleMessage
                                                                                                                                                                                                                                                                                                                        *
                                                                                                                                                                                                                                                                                                                        * @param {Object} message console message
                                                                                                                                                                                                                                                                                                                        *
                                                                                                                                                                                                                                                                                                                        * @see Mediator#onConsoleMessage
                                                                                                                                                                                                                                                                                                                        */
  pm.mediator.trigger('consoleMessage', {
    label: label,
    message: message,
    children: {
      type: type,
      data: data } });


};let

PmConsole = class PmConsole {
  constructor() {
    ['debug', 'error', 'info', 'log', 'warn'].forEach(level => {
      this[level] = function (...args) {
        try {
          console.log(...args.slice(2));
        }
        catch (e) {
          // nothing
        }
        if (_.isError(args[0])) {
          sendLogToConsole(level, args[0].message, 'LOG', null);
        } else
        if (args[0] === 'exception') {
          sendLogToConsole(level, args[1] && args[1].message || 'Error', 'LOG', null);
        } else
        {
          const isMultiArg = args.slice(3).length;
          sendLogToConsole(level, args.slice(2)[0], 'LOG', isMultiArg ? args.slice(3) : null);
        }
      };
    });
  }

  trace(args) {

  } // not supported on postman yet

  /**
   * Used to display network log on the console.
   * @param  {String} ref  [Current id of the cursor in the runner]
   * @param  {Object} data [Object with properties => request and response]
   */
  net(ref, data) {
    if (!ref || !data || data && !data.request) {
      console.error('PmConsole: missing parameters');
      return;
    }
    data.ref = ref;
    sendLogToConsole(data.request.method, data.request.url, 'NET', data);
  }

  netErr(ref, errMsg, data = {}) {
    if (!ref || !errMsg) {
      console.error('PmConsole: missing parameters');
      return;
    }
    sendLogToConsole('error', null, 'NET', _extends({
      ref: ref,
      err: { message: errMsg } },
    data));

  }};
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),

/***/ 636:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(_) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToastManager; });
let ToastManager = class ToastManager {
  constructor() {
    this.notificationQueue = [];
    this.isPaused = false;
  }

  isVisible() {
    var notifs = !document.getElementsByClassName('notification'),
    tooltips = !document.getElementsByClassName('tooltip'),
    fullscreenModals = !document.getElementsByClassName('modal-fullscreen');

    return !(notifs && tooltips && fullscreenModals);
  }

  enqueue(callback, priority) {
    this.notificationQueue.push({
      callback: callback,
      priority: priority });


    this.process();
  }

  dequeue() {
    var minPriority = _.min(_.map(this.notificationQueue, 'priority'));
    var toRunIndex = _.findKey(this.notificationQueue, function (element) {
      return element.priority === minPriority;
    });
    return this.notificationQueue.splice(toRunIndex, 1)[0];
  }

  process() {
    if (this.isVisible() || this.isPaused) {
      setTimeout(() => {
        this.process();
      }, 1000); // Try again after 1 second
    } else
    {
      this.isPaused = true;
      this.dequeue().callback();

      setTimeout(() => {
        this.isPaused = false;
      }, 2000); // Separation between notifications
    }
  }};
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),

/***/ 637:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_postman_collection__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_postman_collection___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_postman_collection__);


// Add Unit tests
let ResolveVariableHelper = class ResolveVariableHelper {
  constructor() {
  }

  resolve(string, variables = {}) {
    if (typeof string === 'number') {
      return string;
    }

    if (string == null) {
      return '';
    }

    return __WEBPACK_IMPORTED_MODULE_0_postman_collection__["Property"].replaceSubstitutions(string, variables);
  }};


/* harmony default export */ __webpack_exports__["a"] = (new ResolveVariableHelper());

/***/ }),

/***/ 638:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(_) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__postman_sanitise_user_content__ = __webpack_require__(472);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__postman_sanitise_user_content___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__postman_sanitise_user_content__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_DashboardService__ = __webpack_require__(519);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_uuid_v4__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_uuid_v4___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_uuid_v4__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_messaging_Toast__ = __webpack_require__(639);







const eventBusChannel = null;
/* harmony export (immutable) */ __webpack_exports__["eventBusChannel"] = eventBusChannel;


const getEventBus = function () {
  if (!this.eventBusChannel) this.eventBusChannel = pm.eventBus.channel('notifications');
  return this.eventBusChannel;
};
/* harmony export (immutable) */ __webpack_exports__["getEventBus"] = getEventBus;


const setNotificationComponent = function (ref) {
  this._ref = ref;
  this.attachLinkListeners();

  // Listen for notifications from windows with no UI
  if (_.get(pm, 'windowConfig.ui')) {
    this.getEventBus().subscribe(options => {
      this._show(options);
    });
  }
};
/* harmony export (immutable) */ __webpack_exports__["setNotificationComponent"] = setNotificationComponent;


const attachLinkListeners = function () {
  if (!this._ref) {
    return;
  }

  let notificationWrapper = Object(__WEBPACK_IMPORTED_MODULE_1_react_dom__["findDOMNode"])(this._ref);
  if (!notificationWrapper) {
    return;
  }

  notificationWrapper.addEventListener('click', e => {
    let classList = e.target.classList,
    allowClicks = ['toast-dismiss', 'toast-primary-action', 'toast-secondary-action'];

    if (_.isEmpty(_.intersection(classList, allowClicks))) {
      // This check is there if the target is SVG (close icon)
      // and its parent is 'toast-dismiss'
      const maxParentNodeLookupCount = 4;
      let currentTarget = e.target,
      targetClass = currentTarget.className,
      notificationClass = 'notifications-wrapper',
      lookUpCount = 0;

      while (targetClass && targetClass !== notificationClass) {
        if (lookUpCount > maxParentNodeLookupCount) {
          break;
        }

        // Do not prevent if the icon is a child node of toast-dismiss
        if (targetClass === 'toast-dismiss') {
          return;
        }

        currentTarget = _.get(currentTarget, 'parentNode', null);
        targetClass = _.get(currentTarget, 'className', null);
        lookUpCount++;
      }

      e.preventDefault();
      e.stopPropagation();
    }

    if (e.target.tagName !== 'A') {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    let link = e.target.href;
    if (link) {
      pm.app.openExternalLink(link);
    } else
    {
      try {
        let slug = e.target.dataset.slug;
        if (slug === 'invite_users') {
          Object(__WEBPACK_IMPORTED_MODULE_3__services_DashboardService__["l" /* openInviteUsers */])();
        }
      }
      catch (e) {
        console.error(e);
      }
    }
  });
};
/* harmony export (immutable) */ __webpack_exports__["attachLinkListeners"] = attachLinkListeners;


const getRef = function () {
  return this._ref;
};
/* harmony export (immutable) */ __webpack_exports__["getRef"] = getRef;


const _getBaseOptions = function (persist, timeout) {
  return {
    position: 'tr',
    dismissible: true,
    autoDismiss: persist ? 0 : timeout };

};
/* harmony export (immutable) */ __webpack_exports__["_getBaseOptions"] = _getBaseOptions;


/**
    * Returns level for type for the react notification system
    *
    * @param {*} type
    */
function getLevelForType(type) {
  let map = {
    success: 'success',
    error: 'error',
    warn: 'warning',
    info: 'info' };

  return map[type];
}

const _show = function (options) {
  if (!this._ref) {
    _.get(pm, 'windowConfig.ui') ? console.error('Notification System not initialized') : this.getEventBus().publish(options);
    return;
  }

  let {
    type = 'info',
    message,
    dedupeId,
    primaryAction = null,
    secondaryAction = null,
    persist = false,
    timeout = 3000,
    title = null,
    primaryButtonLabel = '',
    secondaryButtonLabel = '',
    enableActions = null,
    noIcon = false,
    isDismissable = true,
    onDismiss = null,

    // HACK: quick fix for 100K. cleanup.
    skipSanitise = false } =
  options;

  // react notification system takes seconds timeout
  timeout /= 1000;
  let notificationId = __WEBPACK_IMPORTED_MODULE_4_uuid_v4___default()(),
  notification = _.extend(
  this._getBaseOptions(persist, timeout), {
    uid: notificationId,
    level: getLevelForType(type),
    children:
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__components_messaging_Toast__["a" /* default */], {
      isDismissable: isDismissable,
      noIcon: noIcon,
      uid: notificationId,
      dismiss: this._ref.removeNotification,
      type: type,
      title: title || null,
      message: message,
      primaryAction: primaryAction,
      secondaryAction: secondaryAction,
      onDismiss: onDismiss }) });





  if (dedupeId) {
    notification = _.extend(notification, { uid: `${getLevelForType(type)}-${dedupeId}` });
  }

  this._ref.addNotification(notification);
};
/* harmony export (immutable) */ __webpack_exports__["_show"] = _show;


const error = function (message, options) {
  message || (message = 'Something went wrong. Please try again.');
  options || (options = {});

  this._show(
  _.extend(options, {
    type: 'error',
    message: message }));


};
/* harmony export (immutable) */ __webpack_exports__["error"] = error;


const info = function (message, options) {
  if (!message) {
    return;
  }

  options || (options = {});

  this._show(
  _.extend(options, {
    type: 'info',
    message: message }));


};
/* harmony export (immutable) */ __webpack_exports__["info"] = info;


const success = function (message, options) {
  if (!message) {
    return;
  }

  options || (options = {});

  this._show(
  _.extend(options, {
    type: 'success',
    message: message }));


};
/* harmony export (immutable) */ __webpack_exports__["success"] = success;


const warn = function (message, options) {
  if (!message) {
    return;
  }

  options || (options = {});

  this._show(
  _.extend(options, {
    type: 'warn',
    message: message }));


};
/* harmony export (immutable) */ __webpack_exports__["warn"] = warn;

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),

/***/ 639:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Toast; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base_Buttons__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__base_Icons_InformationIcon__ = __webpack_require__(258);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__base_Icons_CloseIcon__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__base_Markdown__ = __webpack_require__(248);






let

Toast = class Toast extends __WEBPACK_IMPORTED_MODULE_0_react__["Component"] {
  constructor() {
    super();

    this.handlePrimaryAction = this.handlePrimaryAction.bind(this);
    this.handleSecondaryAction = this.handleSecondaryAction.bind(this);
    this.dismissToast = this.dismissToast.bind(this);
  }

  handlePrimaryAction() {
    if (this.props.primaryAction && this.props.primaryAction.onClick) {
      this.props.primaryAction.onClick();
    }
    this.props.dismiss(this.props.uid);
  }

  handleSecondaryAction() {
    if (this.props.secondaryAction && this.props.secondaryAction.onClick) {
      this.props.secondaryAction.onClick();
    }
    this.props.dismiss(this.props.uid);
  }

  dismissToast() {
    // The notification system provides a handler
    // to remove the toast
    this.props.dismiss(this.props.uid);
    this.props.onDismiss && this.props.onDismiss(this.props.uid);
  }

  getTypeClass() {
    let typeClass = this.props.type ? `toast-${this.props.type}` : 'toast-info';
    return __WEBPACK_IMPORTED_MODULE_3_classnames___default()({
      'toast': true,
      [typeClass]: true });

  }

  getActions() {
    const { primaryAction = null, secondaryAction = null } = this.props;

    if (primaryAction || secondaryAction) {
      return (
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', { className: 'toast-actions' },

          primaryAction &&
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__base_Buttons__["a" /* Button */], {
              className: 'toast-primary-action',
              type: 'primary',
              size: 'small',
              disabled: primaryAction.disabled,
              onClick: this.handlePrimaryAction },

            primaryAction.label),



          secondaryAction &&
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__base_Buttons__["a" /* Button */], {
              className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()({ 'toast-secondary-action': true, 'toast-secondary-action-only': !primaryAction }),
              type: 'text',
              disabled: secondaryAction.disabled,
              onClick: this.handleSecondaryAction },

            secondaryAction.label)));




    }
  }

  getContentClasses() {
    return __WEBPACK_IMPORTED_MODULE_3_classnames___default()({
      'toast-content': true,
      'toast-content-shrink': this.props.isDismissable });

  }

  render() {
    const {
      title,
      message,
      onMessageLinkClick,
      disabled,
      isDismissable,
      noIcon } =
    this.props;

    return (
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', { className: this.getTypeClass() },

        !noIcon &&
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__base_Icons_InformationIcon__["a" /* default */], { className: 'toast-icon' }),

        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', { className: this.getContentClasses() },

          title &&
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', { className: 'toast-title' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__base_Markdown__["a" /* default */], {
              source: title,
              onLinkClick: onMessageLinkClick })),



          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', { className: 'toast-body' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__base_Markdown__["a" /* default */], {
              source: message,
              onLinkClick: onMessageLinkClick })),


          this.getActions()),


        isDismissable &&
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', {
            className: 'toast-dismiss',
            onClick: this.dismissToast },

          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__base_Icons_CloseIcon__["a" /* default */], {
            className: 'toast-close',
            size: 'xs' }))));





  }};


Toast.defaultProps = {
  type: 'info',
  message: '',
  disabled: false,
  isDismissable: true,
  noIcon: false,
  onMessageLinkClick: null };


Toast.propTypes = {
  type: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.oneOf(['error', 'success', 'warn', 'info']),
  message: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string,
  isDismissable: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool,
  noIcon: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool,
  dismiss: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func.isRequired,
  onMessageLinkClick: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func };

/***/ }),

/***/ 640:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(_) {/* unused harmony export findSession */
/* unused harmony export clearOrphanSessions */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return bootSession; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_controllers_WindowController__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_controllers_WindowController___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__common_controllers_WindowController__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_controllers_WorkspaceSessionController__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_controllers_WorkspaceController__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_uuid_v4__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_uuid_v4___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_uuid_v4__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_model_event__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_default_workspace__ = __webpack_require__(98);
var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};






let getDefaultSession = window => {
  return Object(__WEBPACK_IMPORTED_MODULE_5__utils_default_workspace__["c" /* defaultUserWorkspaceId */])().
  then(defaultWorkspaceId => {
    if (!defaultWorkspaceId) {
      return Promise.reject(new Error('Could not find default workspace while booting session'));
    }

    return __WEBPACK_IMPORTED_MODULE_2__modules_controllers_WorkspaceController__["a" /* default */].get({ id: defaultWorkspaceId });
  }).
  then(defaultWorkspace => {
    if (!defaultWorkspace) {
      return Promise.reject(new Error('Could not find default workspace while booting session'));
    }

    return defaultWorkspace;
  }).
  then(defaultWorkspace => {
    return __WEBPACK_IMPORTED_MODULE_1__modules_controllers_WorkspaceSessionController__["a" /* default */].
    create({
      id: __WEBPACK_IMPORTED_MODULE_3_uuid_v4___default()(),
      window: window.id,
      workspace: defaultWorkspace.id,
      state: {} }).

    then(sessionCreatedEvent => {
      return Object(__WEBPACK_IMPORTED_MODULE_4__modules_model_event__["d" /* getEventData */])(sessionCreatedEvent);
    });
  });
};

let findSession = (window, options) => {
  return Promise.resolve()

  // First, check if this window is supposed to be opened with a workspace (New window with workspace pre-selected)
  .then(() => {
    // If this window is not being opened with a pre-selected workspace, move on
    if (!options.session || !options.session.workspace) {
      return;
    }

    // If this window is supposed to be opened with a workspace, just create the session
    // with that workspace and move on
    return __WEBPACK_IMPORTED_MODULE_1__modules_controllers_WorkspaceSessionController__["a" /* default */].
    getSessionFor(window.id, options.session.workspace).
    then(session => {
      // If the window is not supposed to have pre-selected state, move on
      if (!options.session.state) {
        return session;
      }

      // Otherwise, update the session's state with whatever is supplied
      return __WEBPACK_IMPORTED_MODULE_1__modules_controllers_WorkspaceSessionController__["a" /* default */].
      update({
        id: session.id,
        state: _extends({},
        session.state,
        options.session.state) }).


      then(sessionUpdatedEvent => {
        return Object(__WEBPACK_IMPORTED_MODULE_4__modules_model_event__["d" /* getEventData */])(sessionUpdatedEvent);
      });
    });
  })

  // First, check if this window is supposed to be opened with a defined session (restore flow)
  .then(session => {
    // If we've already found a session, move on
    if (session) {
      return session;
    }

    // If this window is not being restored, move on
    if (!options.session || !window.activeSession) {
      return;
    }

    return __WEBPACK_IMPORTED_MODULE_1__modules_controllers_WorkspaceSessionController__["a" /* default */].
    get({ id: window.activeSession }).
    then(session => {
      if (!session || session.window !== window.id) {
        return;
      }

      return session;
    });
  })

  // If the window's activeSession exists, continue, or else try finding another suitable session
  .then(session => {
    if (session) {
      return session;
    }

    // Active session on this window does not exist, trying to find some other session on this window
    return __WEBPACK_IMPORTED_MODULE_1__modules_controllers_WorkspaceSessionController__["a" /* default */].
    getAll({ window: pm.window.id }).
    then(allSessions => {
      if (allSessions && allSessions[0]) {
        return allSessions[0];
      }

      // There are no sessions on this window, creating one
      return getDefaultSession(window);
    });
  })

  // Verify if the session being restored points to a valid workspace.
  .then(session => {
    return __WEBPACK_IMPORTED_MODULE_2__modules_controllers_WorkspaceController__["a" /* default */].
    get({ id: session.workspace }).
    then(workspace => {
      // If the workspace being pointed to does not exist, delete this session and restart the session boot
      if (workspace) {
        return session;
      }

      return getDefaultSession(window);
    });
  });
};

let clearOrphanSessions = (activeWindowId, { activeSessionId }) => {
  // Find all sessions, if for a session, the window / workspace does not exist, delete the session
  return __WEBPACK_IMPORTED_MODULE_1__modules_controllers_WorkspaceSessionController__["a" /* default */].
  getAll().
  then(allSessions => {
    // First, take the currently active session out of the picture.
    // Don't want to ever delete that
    _.remove(allSessions, session => session.id === activeSessionId);
    return allSessions;
  }).
  then(allSessions => {
    // Remove all sessions with an invalid window ID
    return Promise.all(
    _.map(allSessions, session => {
      return __WEBPACK_IMPORTED_MODULE_0__common_controllers_WindowController___default.a.get({ id: session.window }).
      then(window => {
        if (window) {
          return session;
        }

        return __WEBPACK_IMPORTED_MODULE_1__modules_controllers_WorkspaceSessionController__["a" /* default */].delete({ id: session.id }).
        then(sessionDeletedEvent => {
          return;
        }).
        catch(e => {
          console.error(`Failed to clear orphan sessions on window ${session.window}`, e);
          return session;
        });
      });
    }));

  }).
  then(sessions => {
    // Clean the result, remove all undefined values from the previous loop
    return _.compact(sessions);
  }).
  then(allSessions => {
    // Now, remove all sessions on the currentWindow, with an invalid workspace
    return Promise.all(
    _.map(allSessions, session => {
      return __WEBPACK_IMPORTED_MODULE_2__modules_controllers_WorkspaceController__["a" /* default */].get({ id: session.workspace }).
      then(workspace => {
        if (session.window === activeWindowId && !workspace) {
          return __WEBPACK_IMPORTED_MODULE_1__modules_controllers_WorkspaceSessionController__["a" /* default */].delete({ id: session.id }).
          catch(e => {
            console.error(`Failed to clear orphan sessions with workspace ${session.workspace}`, e);
          });
        }
      });
    }));

  });
};

// IMPORTANT: DO NOT REORDER PROMISES HERE
// 1. Getting launch params from window
// 2. Get / create a window
// 3. Find a suitable session (find / create). Session create should always be after window create, otherwise this might be pruned
// 4. Update the new window with the new session's ID
// 5. Complete the boot process
// 6. Start pruning orphan sessions
let bootSession = cb => {
  return __WEBPACK_IMPORTED_MODULE_0__common_controllers_WindowController___default.a.
  getLaunchParams()

  // First, initialize the WindowController
  .then(windowParams => {
    return __WEBPACK_IMPORTED_MODULE_0__common_controllers_WindowController___default.a.bootstrap(...windowParams);
  })

  // Find the window being restored / opened
  .then(windowParams => {
    let window = windowParams[0],
    options = windowParams[1];

    return __WEBPACK_IMPORTED_MODULE_0__common_controllers_WindowController___default.a.
    getCurrentWindow().
    then(currentWindow => {
      if (currentWindow) {
        return currentWindow;
      }

      // Worst case scenario
      return Promise.reject(new Error('Window to open does not exist ' + pm.window.id));
    })

    // Try to find the session that the window opened wants to open
    .then(() => findSession(...windowParams))

    // Update the Window table to indicate the new session is the active session
    .then(session => {
      return __WEBPACK_IMPORTED_MODULE_0__common_controllers_WindowController___default.a.update({
        id: window.id,
        activeSession: session.id });

    })

    // Complete the boot process
    .then(() => {
      pm.logger.info('Session~boot - Success');
      cb && cb(null);
    }).

    catch(e => {
      pm.logger.error('Session~boot - Failed', e);
      cb && cb(e);
    })

    // Prune any sessions that are invalid
    .then(() => clearOrphanSessions()).
    catch(() => {});
  });
};


/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),

/***/ 642:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(_) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_sync_SyncManagerProxy__ = __webpack_require__(643);


/**
                                                                    *
                                                                    */
function bootSyncProxy(cb) {
  _.assign(window.pm, { syncManager: new __WEBPACK_IMPORTED_MODULE_0__models_sync_SyncManagerProxy__["a" /* default */]() });
  pm.logger.info('SyncProxy~boot - Success');
  cb && cb(null);
}

/* harmony default export */ __webpack_exports__["a"] = (bootSyncProxy);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),

/***/ 643:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(_) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_model_event__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_backbone__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_backbone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_backbone__);



/**
                                  * Handles the socket, and is the interface for sending and receiving changesets
                                  *
                                  * @class SyncManager
                                  */
var SyncManagerProxy = __WEBPACK_IMPORTED_MODULE_1_backbone___default.a.Model.extend({
  defaults: function () {
    return {
      socketConnected: false,
      loggedIn: false,
      currentSyncStatus: 'disabledSync',
      nextReconnectTime: null,
      timeTillReconnect: null };

  },

  sendEventToSyncShared: function (event) {
    this.syncInternalChannel.publish(event);
  },

  requestInitialHydrateFromSyncShared: function () {
    this.sendEventToSyncShared(Object(__WEBPACK_IMPORTED_MODULE_0__modules_model_event__["a" /* createEvent */])('hydrate', 'currentSyncStatus'));
  },

  attachInternalChannelSubscription: function () {
    this.syncManagerInternalDispose = this.syncInternalChannel.subscribe(event => {
      let eventNamespace = Object(__WEBPACK_IMPORTED_MODULE_0__modules_model_event__["g" /* getEventNamespace */])(event),
      eventName = Object(__WEBPACK_IMPORTED_MODULE_0__modules_model_event__["f" /* getEventName */])(event),
      eventData = Object(__WEBPACK_IMPORTED_MODULE_0__modules_model_event__["d" /* getEventData */])(event);

      if (eventNamespace === 'currentSyncStatus' && eventName === 'updated') {
        this.set('currentSyncStatus', eventData.currentSyncStatus);
        return;
      }

      if (eventNamespace === 'timeTillReconnect' && eventName === 'updated') {
        this.set('timeTillReconnect', eventData.timeTillReconnect);
        return;
      }

      if (eventNamespace === 'loggedIn' && eventName === 'updated') {
        this.set('loggedIn', eventData.loggedIn);
        return;
      }

      if (eventNamespace === 'socketConnected' && eventName === 'updated') {
        this.set('socketConnected', eventData.socketConnected);
        return;
      }

      if (eventNamespace === 'conflicts' && eventName === 'show') {
        this.showConflicts(eventData.conflicts);
        return;
      }

      if (eventNamespace === 'issue' && eventName === 'show') {
        this.showSyncIssue(eventData.issue);
        return;
      }
    });
  },

  initialize: function () {
    this.syncInternalChannel = pm.eventBus.channel('sync-manager-internal');
    this.attachInternalChannelSubscription();
    this.requestInitialHydrateFromSyncShared();
  },

  showConflicts: function (conflicts) {
    this.trigger('showConflicts', conflicts);
  },

  showSyncIssue: function (issue) {
    pm.mediator.trigger('showSyncIssue', issue);
  },

  syncIconClick: function () {
    this.sendEventToSyncShared(Object(__WEBPACK_IMPORTED_MODULE_0__modules_model_event__["a" /* createEvent */])('syncIconClicked', 'command'));
  },

  restoreCollection: function (restoreTarget, cb) {
    if (_.includes(['makeNotConnected', 'disabledSync'], this.get('currentSyncStatus'))) {
      pm.toasts.error('You need to be connected to Postman Sync to restore a collection.');
      _.isFunction(cb) && cb(new Error('No sync connection to restore collection'));
      return;
    }
    this.sendEventToSyncShared(Object(__WEBPACK_IMPORTED_MODULE_0__modules_model_event__["a" /* createEvent */])('restoreCollection', 'command', { restoreTarget: restoreTarget }));
    cb();
  },

  conflictsResolved: function (resolution) {
    this.sendEventToSyncShared(Object(__WEBPACK_IMPORTED_MODULE_0__modules_model_event__["a" /* createEvent */])('conflictsResolved', 'command', { resolution: resolution }));
  },

  forceSync: function () {
    this.sendEventToSyncShared(Object(__WEBPACK_IMPORTED_MODULE_0__modules_model_event__["a" /* createEvent */])('forceSync', 'command'));
  },

  forceSyncCollectionAndContinue: function (id) {
    this.sendEventToSyncShared(Object(__WEBPACK_IMPORTED_MODULE_0__modules_model_event__["a" /* createEvent */])('forceSyncCollectionAndContinue', 'command', { collection: id }));
  },

  forceConnect: function () {
    this.sendEventToSyncShared(Object(__WEBPACK_IMPORTED_MODULE_0__modules_model_event__["a" /* createEvent */])('forceConnect', 'command'));
  },

  fetchPendingConflicts: function () {
    this.sendEventToSyncShared(Object(__WEBPACK_IMPORTED_MODULE_0__modules_model_event__["a" /* createEvent */])('fetchPendingConflicts', 'command'));
  } });


/* harmony default export */ __webpack_exports__["a"] = (SyncManagerProxy);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),

/***/ 644:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_util__ = __webpack_require__(14);


let _ = __webpack_require__(0);
let { ipcRenderer } = __webpack_require__(18);
let { Item, Request, Response, VariableScope } = __webpack_require__(65);

/**
                                                                                 * Pool of all existing runs
                                                                                 *
                                                                                 * @var {Object} RendererRuntimeBridge~runPool
                                                                                 */
let runPool = {},
authManifestCache = new Map();

/**
                                * A list of callbacks that runtime fires over the lifetime of a collection run
                                *
                                * @type {String[]}
                                *
                                * @see https://github.com/postmanlabs/postman-runtime/blob/develop/README.md
                                */
const runtimeRunCallbacks = [
'start',
'io',
'beforeIteration',
'beforeItem',
'beforePrerequest',
'prerequest',
'beforeRequest',
'request',
'response',
'assertion',
'beforeTest',
'test',
'cookies', // custom callback
'item',
'iteration',
'exception',
'console',
'pause',
'resume',
'error',
'done',
'stop',
'abort'];


/**
           * Disposes a Runtime run object.
           * Also makes sure there are no pending callbacks before removing its instance from `runPool`.
           *
           * @function RendererRuntimeBridge~disposeRun
           *
           * @param {UUID} runId - ID of the run instance
           */
function disposeRun(runId) {
  var runCache = runPool[runId];
  if (!runCache) {
    return;
  }

  if (runCache.pendingCallbacks === 0) {
    ipcRenderer.send('RUNTIME_RUN_DISPOSE', runId);
    delete runPool[runId];
    return;
  }

  setTimeout(disposeRun, 1000, runId);
}

// The collection of callback reducers
// Each reducer takes in serialised params and
// returns an array of deserialized params
let callbackArgumentReducers = {
  start(err, cursor) {
    return [JSON.parse(err), cursor];
  },

  io(err, cursor, trace, response, request, cookies) {
    return [JSON.parse(err), cursor, trace, response && new Response(response), request && new Request(request), cookies];
  },

  exception(cursor, exception) {
    return [cursor, JSON.parse(exception)];
  },

  beforeIteration(err, cursor) {
    return [JSON.parse(err), cursor];
  },

  beforeItem(err, cursor, item) {
    return [JSON.parse(err), cursor, item && new Item(item)];
  },

  beforePrerequest(err, cursor, events, item) {
    return [JSON.parse(err), cursor, JSON.parse(events), item && new Item(item)];
  },

  prerequest(err, cursor, prResults, item) {
    let results = JSON.parse(prResults);
    _.forEach(results, test => {
      test.result.globals = new VariableScope(test.result.globals);
      test.result.environment = new VariableScope(test.result.environment);
    });
    return [JSON.parse(err), cursor, results, item && new Item(item)];
  },

  beforeRequest(err, cursor, request, item, aborter) {
    return [JSON.parse(err), cursor, request && new Request(request), item && new Item(item), aborter];
  },

  request(err, cursor, response, request, item, cookies) {
    return [JSON.parse(err), cursor, response && new Response(response), request && new Request(request), item && new Item(item), cookies];
  },

  response(err, cursor, response, request, item, cookies) {
    return [JSON.parse(err), cursor, response && new Response(response), request && new Request(request), item && new Item(item), cookies];
  },

  assertion(cursor, assertion) {
    return [cursor, JSON.parse(assertion)];
  },

  beforeTest(err, cursor, events, item) {
    return [JSON.parse(err), cursor, JSON.parse(events), item && new Item(item)];
  },

  test(err, cursor, testResults, item) {
    let results = JSON.parse(testResults);
    _.forEach(results, test => {
      test.result.globals = new VariableScope(test.result.globals);
      test.result.environment = new VariableScope(test.result.environment);
    });
    return [JSON.parse(err), cursor, results, item && new Item(item)];
  },

  cookies(err, cookies) {
    return [JSON.parse(err), cookies];
  },

  item(err, cursor, item) {
    return [JSON.parse(err), cursor, item && new Item(item)];
  },

  iteration(err, cursor) {
    return [JSON.parse(err), cursor];
  },

  pause(err, cursor) {
    return [JSON.parse(err), cursor];
  },

  resume(err, cursor) {
    return [JSON.parse(err), cursor];
  },

  done(err, cursor) {
    return [JSON.parse(err), cursor];
  },

  error(err) {
    return [JSON.parse(err)];
  },

  stop(err, ...args) {
    return [JSON.parse(err), ...args];
  },

  abort(err, ...args) {
    return [JSON.parse(err), ...args];
  } };


/**
        * Invokes a callback on the run with arguments safely.
        *
        * @function RendererRuntimeBridge~invokeCallbackSafely
        *
        * @param {UUID} id       - ID of the run
        * @param {String} callback - Name of the callback that will be invoked
        * @param {...*} args          - An array of arguments that need to be sent to the callback
       */
function invokeCallbackSafely(id, callback, ...args) {
  return runPool[id] && runPool[id].callbackMap && _.isFunction(runPool[id].callbackMap[callback]) && runPool[id].callbackMap[callback](...args);
}

/**
   * Adds an IPC listener to a callback
   *
   * @function RendererRuntimeBridge~assignListenersToCallbacks
   *
   * @param {String} callbackName - Name of the callback to attach the listener to
   */
function assignListenersToCallbacks(callbackName) {
  let listenerName = `RUNTIME_CALLBACK_${callbackName.toUpperCase()}`;
  ipcRenderer.on(listenerName, (event, id, ...rawArgs) => {
    // See if this callback has a reducer
    // If it has one apply the params to the reducer and then
    // send them to the callback
    let argumentsReducer = callbackArgumentReducers[callbackName];
    let reducedAguments = _.isFunction(argumentsReducer) ? argumentsReducer(...rawArgs) : rawArgs;

    if (callbackName === 'test') {
      runPool[id] && runPool[id].pendingCallbacks++;
    }

    if (callbackName === 'cookies') {
      runPool[id] && runPool[id].pendingCallbacks--;
    }
    invokeCallbackSafely(id, callbackName, ...reducedAguments);
  });
}

// Adds listeners for each callback.
_.forEach(runtimeRunCallbacks, assignListenersToCallbacks);

/**
                                                             * The bridge on the renderer process
                                                             *
                                                             * @class RendererRuntimeBridge
                                                             *
                                                             * RuntimeBridge is a pipeline through which main process and renderer process
                                                             * send and receive `run` related data.
                                                             *
                                                             * When the app wants to create a run, it asks the RuntimeBridge on
                                                             * renderer process to create one, with the set of options.
                                                             *
                                                             * This RuntimeBridge then sends a signal to its counterpart on the main process
                                                             * passing along the options and a new id.
                                                             *
                                                             * The main process is where postman-runtime instance is created. This instance is
                                                             * stored against the id on the main process for future references.
                                                             * All future communications between the two are based on this id.
                                                             *
                                                             * Each callback on the main process sends a signal with the tracking id
                                                             * and serialized params.
                                                             *
                                                             * The bridge on renderer process deserializes the params and uses the tracking id
                                                             * to pass it on to the caller.
                                                             *
                                                             * In the same way, if the app wants to pause, resume or stop a run it tells the
                                                             * RuntimeBridge, which then converts it to a signal and
                                                             * then sends it to the main process.
                                                             *
                                                             * Now there are only 2 instances of RuntimeBridge talking to each other
                                                             * over a finite set of listeners(one per callback).
                                                             *
                                                             * This approach has advantages over `electron.remote.require()`.
                                                             * The number of inter process communications is reduced to one per callback,
                                                             * where it used to be one per each property access.
                                                             *
                                                             * NOTE: A signal here refers to an IPC call. All IPC calls here are async.
                                                             */let
RendererRuntimeBridge = class RendererRuntimeBridge {
  /**
                                                      * Sends an IPC call out to start a run
                                                      *
                                                      * @function RendererRuntimeBridge#startRun
                                                      *
                                                      * @param {Object} runnerOptions             - Options for new Runner
                                                      * @param {Object} runOptions                - Options for runtime's run function
                                                      * @param {Object} runMetaData               - Miscellaneous run related data, certificates etc.
                                                      * @param {Collection~definition} collection - The collection to run
                                                      * @param {Object} runCallbackMap            - Callbacks for each run
                                                      *
                                                      * @returns {Promise} - Fulfills when the run is created
                                                      */
  startRun(runnerOptions, runOptions, runMetaData, collection, runCallbackMap) {
    const id = __WEBPACK_IMPORTED_MODULE_0__utils_util__["a" /* default */].guid();

    let runCreatePromise = new Promise((resolve, reject) => {
      // resolve promise with the id when the success event is received
      ipcRenderer.once(`RUNTIME_RUN_CREATE_${id}`, (event, receivedRunId) => {
        runPool[receivedRunId] = {
          callbackMap: runCallbackMap,
          pendingCallbacks: 0 };

        resolve(receivedRunId);
      });

      // reject promise with error when error event is received
      ipcRenderer.once(`RUNTIME_RUN_CREATE_ERROR_${id}`, (event, error) => {
        reject(JSON.parse(error));
      });
    });

    // send a call event out to the RuntimeBridge on main process
    ipcRenderer.send('RUNTIME_RUN_CREATE', id, runnerOptions, runOptions, runMetaData, collection.toJSON());

    return runCreatePromise;
  }

  /**
     * Sends a pause call for the run to main process
     *
     * @function RendererRuntimeBridge#pauseRun
     *
     * @param {UUID} id - ID of the run to pause
     */
  pauseRun(id) {
    ipcRenderer.send('RUNTIME_RUN_PAUSE', id);
  }

  /**
     * Sends a resume call for the run to main process
     *
     * @function RendererRuntimeBridge#resumeRun
     *
     * @param {UUID} id - ID of the run to resume
     */
  resumeRun(id) {
    ipcRenderer.send('RUNTIME_RUN_RESUME', id);
  }

  /**
     * Sends a stop call for the run to main process
     *
     * @function RendererRuntimeBridge#stopRun
     *
     * @param {string} id - ID of the run to stop
     */
  stopRun(id) {
    ipcRenderer.send('RUNTIME_RUN_STOP', id);
  }

  /**
     * Sends a call to stop the current in progress request on a run and stop the run
     *
     * @function RendererRuntimeBridge#stopRunRequest
     *
     * @param {UUID} id - The run id with the request to stop
     */
  stopRunRequest(id) {
    ipcRenderer.send('RUNTIME_RUN_STOP_REQUEST', id);
  }

  /**
     * Disposes a run
     *
     * @function RendererRuntimeBridge#disposeRun
     *
     * @param {UUID} id - ID of the run to dispose
     *
     * @see disposeRun
     */
  disposeRun(id) {
    disposeRun(id);
  }

  /**
     * Authorizes a request.
     *
     * @param {Object} request - Postman SDK Request
     * @param {Function} callback - Callback that handles the authorized request.
     */
  authorizeRequest(request, callback) {
    const id = __WEBPACK_IMPORTED_MODULE_0__utils_util__["a" /* default */].guid();

    ipcRenderer.once(`RUNTIME_AUTHORIZE_REQUEST_${id}`, (event, err, receivedRequest) => {
      let authorizedRequest;

      if (err) {
        let error;
        try {
          error = JSON.parse(err);
        }
        catch (parseError) {
          error = parseError;
        }
        return callback(error, null);
      }

      try {
        authorizedRequest = JSON.parse(receivedRequest);
      }
      catch (error) {
        return callback(error, null);
      }

      callback(null, new Request(authorizedRequest));
    });

    ipcRenderer.send('RUNTIME_AUTHORIZE_REQUEST', id, JSON.stringify(request.toJSON()));
  }

  /**
     * Fetches the manifest for the given authorization type.
     *
     * @param {String} authType
     * @param {Function} callback
     */
  getAuthHandlerManifest(authType, callback) {
    if (authManifestCache.has(authType)) {
      return callback(null, authManifestCache.get(authType));
    }
    const id = __WEBPACK_IMPORTED_MODULE_0__utils_util__["a" /* default */].guid();

    ipcRenderer.once(`RUNTIME_GET_AUTH_HANDLER_${id}`, (event, err, authHandlerManifest) => {
      let authManifest;

      if (err) {
        let error;
        try {
          error = JSON.parse(err);
        }
        catch (parseError) {
          error = parseError;
        }
        return callback(error, null);
      }

      try {
        authManifest = JSON.parse(authHandlerManifest);
      }
      catch (error) {
        return callback(error, null);
      }

      authManifestCache.set(authType, authManifest);

      callback(null, authManifest);
    });

    ipcRenderer.send('RUNTIME_GET_AUTH_HANDLER', id, authType);
  }};


/* harmony default export */ __webpack_exports__["a"] = (new RendererRuntimeBridge());

/***/ }),

/***/ 645:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_electron__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_electron___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_electron__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_backbone__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_backbone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_backbone__);



const MIN_ZOOM_LEVEL = -10,
MAX_ZOOM_LEVEL = 10;

var UIZoom = __WEBPACK_IMPORTED_MODULE_1_backbone___default.a.Model.extend({
  initialize: function () {
    this._loadZoomLevel();
    this.applyCurrentZoom();
  },

  increase: function () {
    let nextZoomLevel = this.currentZoomLevel + 1;
    this._validateZoomLevel(nextZoomLevel) && this._setZoomLevel(nextZoomLevel);
    this.trigger('change');
  },

  decrease: function () {
    let nextZoomLevel = this.currentZoomLevel - 1;
    this._validateZoomLevel(nextZoomLevel) && this._setZoomLevel(nextZoomLevel);
    this.trigger('change');
  },

  reset: function () {
    this._setZoomLevel(0);
    this.trigger('change');
  },

  getCurrentScaleFactor: function () {
    return 1 + this.currentZoomLevel * 0.05;
  },

  applyCurrentZoom: function () {
    __WEBPACK_IMPORTED_MODULE_0_electron__["webFrame"].setZoomFactor(this.getCurrentScaleFactor());
  },

  _loadZoomLevel: function () {
    let zoomLevel = pm.settings.getSetting('uiZoom') || 0;
    this.currentZoomLevel = zoomLevel;
  },

  _setZoomLevel: function (zoomLevel) {
    this.currentZoomLevel = zoomLevel;
    this.applyCurrentZoom();
    this._saveZoomLevel(this.currentZoomLevel);
  },

  _saveZoomLevel: function (zoomLevel) {
    pm.settings.setSetting('uiZoom', zoomLevel);
  },

  _validateZoomLevel: function (zoomLevel) {
    if (zoomLevel > MAX_ZOOM_LEVEL || zoomLevel < MIN_ZOOM_LEVEL) {
      return false;
    }

    return true;
  } });


/* harmony default export */ __webpack_exports__["a"] = (UIZoom);

/***/ }),

/***/ 646:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(_) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProxyListManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_postman_collection__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_postman_collection___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_postman_collection__);
let

ProxyListManager = class ProxyListManager {
  constructor() {
    var globalProxies = this.getFromDB();
    _.isEmpty(globalProxies) && (globalProxies = [{ disabled: true }]);

    this.globalProxies = new __WEBPACK_IMPORTED_MODULE_0_postman_collection__["ProxyConfigList"]({}, globalProxies);
  }

  toJSON() {
    return { globalProxies: this.globalProxies.toJSON() };
  }};


_.assign(ProxyListManager.prototype, /** @lends ProxyListManager.prototype */{
  saveToDB: function () {
    pm.settings.setSetting('ProxyListManager', this.toJSON());
  },

  getFromDB: function () {
    var globalProxies = _.get(pm.settings.getSetting('ProxyListManager'), 'globalProxies');
    return globalProxies;
  },

  update: function (options) {
    _.has(options, 'globalProxies') && (this.globalProxies = options.globalProxies);
  } });
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),

/***/ 647:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(_) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_backbone__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_backbone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_backbone__);

const Certificate = __WEBPACK_IMPORTED_MODULE_0_backbone___default.a.Model.extend({
  defaults: function () {
    return {
      host: '',
      pemPath: '',
      keyPath: '',
      passphrase: null,
      _pemData: null,
      _keyData: null };

  },

  resolve: function (cb) {
    if (this.get('_pemData') && this.get('_keyData')) {
      _.isFunction(cb) && cb();
      return;
    }

    const fs = __webpack_require__(36);
    fs.readFile(this.get('pemPath'), (err, _pemData) => {
      fs.readFile(this.get('keyPath'), (err, _keyData) => {
        this.set({
          '_pemData': _pemData,
          '_keyData': _keyData },
        { silent: true });

        _.isFunction(cb) && cb();
      });
    });
  },

  toJSON: function () {
    return {
      host: this.get('host'),
      pemPath: this.get('pemPath'),
      keyPath: this.get('keyPath'),
      passphrase: this.get('passphrase') };

  } });



const CertificateManager = __WEBPACK_IMPORTED_MODULE_0_backbone___default.a.Collection.extend({
  model: Certificate,

  initialize: function () {
    this.loadCertificates();
    this.getCertificateContents = this.getCertificateContents.bind(this);
  },

  loadCertificates: function () {
    let serialisedStore = pm.settings.getSetting('clientCertificates'),
    certificateStore = {};

    try {
      certificateStore = JSON.parse(serialisedStore);
      let certificates = _.get(certificateStore, 'certificates', []);
      let sanitizedCertificates = _.map(certificates, certificate => {
        let sanitizedHost = certificate.host.
        replace(/.*?:\/\//g, '') // strip protocol
        .replace(/\?.*/, '') // strip query
        .replace(/\/.*/, '') // strip path
        .replace(/^\./, ''); // strip leading period

        return _.assign({}, certificate, { host: sanitizedHost });
      });
      this.add(sanitizedCertificates);
    }
    catch (e) {
      console.error('Error loading certificates', e);
    }
  },

  saveCertificates: function () {
    let certificateStore = { certificates: this.toJSON() };

    try {
      let serialisedStore = JSON.stringify(certificateStore);
      pm.settings.setSetting('clientCertificates', serialisedStore);
    }
    catch (e) {
      console.error('Error saving certificates', e);
    }
  },

  findCertificateByDomain: function (host) {
    return _.find(this.models, certificateModel => {
      return host === certificateModel.get('host');
    });
  },

  getCertificateContents: function (host, cb) {
    if (!host) {
      cb(new Error('Only supported in Electron'));
    }

    let certificate = this.findCertificateByDomain(host);

    if (!certificate) {
      cb(new Error('No Certificate found for host:' + host));
      return;
    }

    certificate.resolve(err => {
      if (err) {
        _.isFunction(cb) && cb(err);
        return;
      }

      _.isFunction(cb) && cb(null, {
        host: host,
        pem: certificate.get('_pemData'),
        key: certificate.get('_keyData'),
        passphrase: certificate.get('passphrase'),
        pemPath: certificate.get('pemPath'),
        keyPath: certificate.get('keyPath') });

    });
  },

  addCertificate(host, pemPath, keyPath, passphrase) {
    if (!host) {
      console.error('Error adding certificate', arguments);
      return;
    }

    let certificate = this.findCertificateByDomain(host);

    if (certificate) {
      this.updateCertificate(host, pemPath, keyPath, passphrase);
    } else
    {
      this.add({
        host: host,
        pemPath: pemPath,
        keyPath: keyPath,
        passphrase: passphrase });

    }

    this.saveCertificates();
    return true;
  },

  updateCertificate(host, pemPath, keyPath, passphrase) {
    let certificate = this.findCertificateByDomain(host);

    if (!certificate) {
      return false;
    }

    certificate.set({
      pemPath: pemPath,
      keyPath: keyPath,
      passphrase: passphrase });


    certificate.resolve();
    this.saveCertificates();

    return true;
  },

  removeCertificate(host) {
    let certificate = this.findCertificateByDomain(host);

    if (!certificate) {
      return false;
    }

    this.remove(certificate);

    this.saveCertificates();

    return true;
  } });


/* harmony default export */ __webpack_exports__["a"] = (CertificateManager);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ })

},[1146]);