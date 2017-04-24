/**
 * Generic data service to interact with Strapi.io backend. This will just
 * wrap $http methods to a single service, that is used from application.
 *
 * This is needed because we need to make some common url handling for sails
 * endpoint.
 */
(function () {
  'use strict';

  angular.module('frontend.core.services')
    .factory('dataService', [
      '$http',
      '_',
      'Config',
      '$q',
      function factory($http,
                       _,
                       Config,
                       $q) {
        /**
         * Helper function to get "proper" end point url for sails backend API.
         *
         * @param   {string}    endPoint        Name of the end point
         * @param   {number}    [identifier]    Identifier of endpoint object
         *
         * @returns {string}
         * @private
         */
        function _parseEndPointUrl(endPoint, identifier) {
          if (!_.isUndefined(identifier)) {
            endPoint = endPoint + '/' + identifier;
          }

          return Config.backendUrl + '/' + endPoint;
        }

        /**
         * Helper function to parse used parameters in 'get' and 'count' methods.
         *
         * @param   {{}}    parameters  Used query parameters
         *
         * @returns {{params: {}}}
         * @private
         */
        function _parseParameters(parameters) {
          parameters = parameters || {};

          return {
            params: parameters
          };
        }

        return {
          /**
           * Service method to get count of certain end point objects.
           *
           * @param   {string}    endPoint    Name of the end point
           * @param   {{}}        parameters  Used query parameters
           *
           * @returns {Promise|*}
           */
          count: function count(endPoint, parameters) {
            return $http
              .get(_parseEndPointUrl(endPoint) + '/count/', _parseParameters(parameters));
          },

          /**
           * Service method to get data from certain end point. This will always return a collection
           * of data.
           *
           * @param   {string}    endPoint    Name of the end point
           * @param   {{}}        parameters  Used query parameters
           *
           * @returns {Promise|*}
           */
          collection: function collection(endPoint, parameters) {
            var canceller = $q.defer();

            var cancel = function (reason) {
              canceller.resolve(reason);
            };

            var promise = $http({
              method: 'get',
              url: _parseEndPointUrl(endPoint),
              params: parameters || {},
              timeout: canceller.promise,
              data: {
                cancelable: true
              }
            });

            return {
              promise: promise,
              cancel: cancel
            };
          },

          /**
           * Service method to get data from certain end point. This will return just a one
           * record as an object.
           *
           * @param   {string}    endPoint    Name of the end point
           * @param   {number}    identifier  Identifier of endpoint object
           * @param   {{}}        parameters  Used query parameters
           *
           * @returns {Promise|*}
           */
          fetch: function fetch(endPoint, identifier, parameters) {
            return $http
              .get(_parseEndPointUrl(endPoint, identifier), _parseParameters(parameters));
          },

          /**
           * Service method to create new object to specified end point.
           *
           * @param   {string}    endPoint    Name of the end point
           * @param   {{}}        data        Data to update
           *
           * @returns {Promise|*}
           */
          create: function create(endPoint, data) {
            return $http
              .post(_parseEndPointUrl(endPoint), data);
          },

          /**
           * Service method to update specified end point object.
           *
           * @param   {string}    endPoint    Name of the end point
           * @param   {number}    identifier  Identifier of endpoint object
           * @param   {{}}        data        Data to update
           *
           * @returns {Promise|*}
           */
          update: function update(endPoint, identifier, data) {
            return $http
              .put(_parseEndPointUrl(endPoint, identifier), data);
          },

          /**
           * Service method to delete specified object.
           *
           * @param   {string}    endPoint    Name of the end point
           * @param   {number}    identifier  Identifier of endpoint object
           *
           * @returns {Promise|*}
           */
          delete: function remove(endPoint, identifier) {
            return $http
              .delete(_parseEndPointUrl(endPoint, identifier));
          }
        };
      }
    ]);
})();
