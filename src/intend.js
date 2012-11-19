/*
intend.utils.js
Copyright 2012 Kris Siegel
http://www.KrisSiegel.com/

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
// The following comment is to avoid a JSLint error when accessing HTML or native
// browser features which cannot be declared within a JavaScript file.
// All of these items are verified via a typeof obj !== "undefined" before attempting access
/*global localStorage: false, window: false, postMessage: false, setTimeout: false, console: false */

var intend = (function () {
	"use strict";
	var version, versionStr, capability, delegator, intents, logger, utils, internalBridge;
	version = {
		major: 0,
		minor: 1,
		maintenance: 0,
		type: "ALPHA"
	};

	capability = { };

	// Check for whether we're running in NodeJS or a web browser
	capability.window = (typeof window !== "undefined") ? true : false;

	// Check for support for HTML 5's localStorage
	capability.localStorage = (typeof localStorage !== "undefined" && localStorage.getItem !== undefined && localStorage.setItem !== undefined) ? true : false;

	// Check for support for HTML 5's postMessage
	capability.postMessage = (typeof postMessage !== "undefined") ? true : false;

	// Native logging
	capability.console = { };
	capability.console.log = (typeof console !== "undefined" && typeof console.log !== "undefined") ? true : false;
	capability.console.debug = (typeof console !== "undefined" && typeof console.debug !== "undefined") ? true : false;
	capability.console.info = (typeof console !== "undefined" && typeof console.info !== "undefined") ? true : false;
	capability.console.warn = (typeof console !== "undefined" && typeof console.warn !== "undefined") ? true : false;
	capability.console.error = (typeof console !== "undefined" && typeof console.error !== "undefined") ? true : false;

	logger = (function () {
		var level = 999;

		function log(method, str, args) {
			// TODO: Support args
			if (method !== undefined) {
				method.apply(undefined, [str]);
			}
		}

		return {
			levels: {
				none: 999,
				trace: 99,
				error: 75,
				warning: 50,
				info: 25

			},
			setLevel: function (lvl) {
				level = lvl;
			},
			getLevel: function () {
				return level;
			},
			logTrace: function (str) {
				if (capability.console.log && level <= logger.levels.trace) {
					log(function (s) {
						console.log(s);
					}, str, arguments);
				}
			},
			logInfo: function (str) {
				if (capability.console.info && level <= logger.levels.info) {
					log(function (s) {
						console.info(s);
					}, str, arguments);
				}
			},
			logWarning: function (str) {
				if (capability.console.warn && level <= logger.levels.warning) {
					log(function (s) {
						console.warn(s);
					}, str, arguments);
				}
			},
			logError: function (str) {
				if (capability.console.error && level <= logger.levels.error) {
					log(function (s) {
						console.error(s);
					}, str, arguments);
				}
			}
		};
	}());

	utils = (function () {

		return {
			getVersion: function () {
				return version;
			},
			getVersionString: function () {
				if (versionStr === undefined) {
					versionStr = "";
					versionStr += utils.getVersion().major + ".";
					versionStr += utils.getVersion().minor + ".";
					versionStr += utils.getVersion().maintenance;
					versionStr += "-" + utils.getVersion().type;
				}
				return versionStr;
			},
			getBrowserCapability: function () {
				return capability;
			},
			isString: function (str) {
				return (Object.prototype.toString.call(str) === "[object String]");
			},
			isEmptyString: function (str) {
				var isStr = utils.isString(str);
				if (str === undefined || str === null || (isStr && str.toString().length === 0)) {
					return true;
				}
				if (isStr) {
					return false;
				}
				return undefined;
			},
			isWildCardStringMatch: function (str1, str2) {
				var str1Star = -1, str2Star = -1, shorterIndex = -1, str1EmptyResult, str2EmptyResult;

				str1EmptyResult = utils.isEmptyString(str1);
				str2EmptyResult = utils.isEmptyString(str2);

				if (str1EmptyResult === undefined || str2EmptyResult === undefined) {
					return false;
				}

				if (str1EmptyResult === true || str2EmptyResult === true) {
					return true;
				}

				if (str1.toLowerCase() === str2.toLowerCase()) {
					return true;
				}
				str1Star = str1.indexOf("*");
				str2Star = str2.indexOf("*");
				shorterIndex = shorterIndex = (str1Star === -1 || str2Star === -1) ? shorterIndex = Math.max(str1Star, str2Star) : shorterIndex = Math.min(str1Star, str2Star);
				if ((str1Star !== -1 || str2Star !== -1) && shorterIndex !== -1) {
					if (str1.substring(0, shorterIndex).toLowerCase() === str2.substring(0, shorterIndex).toLowerCase()) {
						return true;
					}
				}

				return false;
			}
		};
	}());

	delegator = (function () {
		var delegates = {}, count = 0;

		return {
			getDelegates: function () {
				return delegates;
			},
			getCount: function () {
				return count;
			},
			registerDelegate: function (source, target, callback, context) {
				if (callback !== undefined && callback !== null) {
					var delegateId = ("d" + count), localContext = (context || this);
					delegates[delegateId] = {
						source: source,
						target: target,
						callback: callback,
						context: localContext
					};
					count += 1;
					return delegateId;
				}
				return undefined;
			},
			executeDelegate: function (delegateId, payload, metadata) {
				return delegates[delegateId].callback.apply(delegates[delegateId].context, [payload, metadata]);
			},
			executeAsyncDelegate: function (delegateId, payload, metadata) {
				setTimeout(function () {
					delegates[delegateId].callback.apply(delegates[delegateId].context, [payload, metadata]);
				}, 0);
			},
			clearDelegates: function () {
				var prop;
				for (prop in delegates) {
					if (delegates.hasOwnProperty(prop)) {
						delete delegates[prop];
					}
				}
				count = 0;
			},
			removeDelegate: function (delegateId) {
				if (delegates[delegateId] !== undefined) {
					delete delegates[delegateId];
					count -= 1;
					return true;
				} else {
					return false;
				}
			}
		};
	}());

	intents = (function () {
		var listeners = { };

		return {
			getListeners: function () {
				return listeners;
			},
			clearRegistrations: function () {
				var prop;
				for (prop in listeners) {
					if (listeners.hasOwnProperty(prop)) {
						delete listeners[prop];
					}
				}
				delegator.clearDelegates();
			},
			getMatchingDelegates: function (action, topic, payloadType) {
				var results = [], actions = [], index = 0;
				if (!utils.isEmptyString(action)) {
					actions = listeners[action.toLowerCase()];
					if (actions !== undefined) {
						for (index; index < actions.length; index += 1) {
							if (utils.isWildCardStringMatch(actions[index].topic, topic)) {
								if (utils.isWildCardStringMatch(actions[index].payloadType, payloadType)) {
									results.push(actions[index]);
								}
							}
						}
					}
				}
				return results;
			},
			express: function (action, topic, payload, payloadType) {
				var index = 0, matches = intents.getMatchingDelegates(action, topic, payloadType);
				for (index; index < matches.length; index += 1) {
					delegator.executeAsyncDelegate(matches[index].delegateId, payload, {
						action: action,
						topic: topic,
						payloadType: payloadType
					});
				}
			},
			register: function (action, topic, payloadType, handler, context) {
				if (utils.isEmptyString(action)) {
					throw "register() - An action cannot be null, undefined or empty.";
				} else {
					var delegateId = delegator.registerDelegate(undefined, undefined, handler, context);
					if (listeners[action.toLowerCase()] === undefined) {
						listeners[action.toLowerCase()] = [];
					}
					listeners[action.toLowerCase()].push({
						topic: topic,
						payloadType: payloadType,
						delegateId: delegateId
					});
					return true;
				}
			},
			unregister: function (action, topic, payloadType) {
				var index, actions;
				if (utils.isEmptyString(action)) {
					throw "unregister() - An action cannot be null, undefined or empty.";
				} else {
					if (listeners[action.toLowerCase()] !== undefined) {
						actions = listeners[action.toLowerCase()];
						for (index = 0; index < actions.length; index += 1) {
							if (utils.isWildCardStringMatch(actions[index].topic, topic)) {
								if (utils.isWildCardStringMatch(actions[index].payloadType, payloadType)) {
									listeners[action.toLowerCase()].splice(index, 1);
									return true;
								}
							}
						}
					}
				}
				return false;
			}
		};
	}());

	/*
		The internal bridge and other components here exist just for running
		unit tests and additional debugging. These items are omitted in releases.
	*/
	internalBridge = {
		version: version,
		capability: capability,
		utils: utils,
		delegator: delegator,
		intents: intents,
		logger: logger
	};

	logger.setLevel(logger.levels.trace);

	logger.logTrace("intend.js - version: " + utils.getVersionString());
	logger.logTrace("intend.js - logging level: " + logger.getLevel());

	return {
		express: intents.express,
		register: intents.register,
		utils: {
			getVersion: utils.getVersion
		},
		internals: internalBridge
	};

}());