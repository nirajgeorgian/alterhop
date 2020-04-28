/******/ (function(modules) { // webpackBootstrap
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var chunk = require("./" + ".hot/" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest() {
/******/ 		try {
/******/ 			var update = require("./" + ".hot/" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch (e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/
/******/ 	//eslint-disable-next-line no-unused-vars
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "a358e73e65afe5520e3a";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/app/navigation/style.module.less":
/*!***************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/app/navigation/style.module.less ***!
  \***************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".navigation {\n  height: 100vh;\n  width: 100%;\n  position: 'fixed';\n  left: 0;\n}\n.navigation .primary {\n  padding: 0.5px 0;\n  height: 100%;\n  width: 100%;\n}\n.navigation .primary .selected {\n  border-left: 5px solid white;\n}\n.navigation .secondary {\n  padding: 0.5rem 1rem;\n  height: 100%;\n  width: 100%;\n}\n.navigation .secondary .hovered:hover {\n  cursor: pointer;\n  background: #2f4566 !important;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/app/style.module.less":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/app/style.module.less ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".pageWrapper {\n  width: 100%;\n  padding: 0;\n  overflow: hidden;\n}\n.pageWrapper .mainWrapper {\n  position: relative;\n  padding: 0;\n  background: #fff;\n}\n.pageWrapper .mainWrapper .mainMenu {\n  z-index: 1;\n}\n.pageWrapper .mainWrapper .mainMenu .navigation {\n  height: 100vh;\n  width: 100%;\n  position: 'fixed';\n  left: 0;\n}\n.pageWrapper .mainWrapper .mainMenu .navigation .menu {\n  height: 100%;\n}\n.routes {\n  height: 100vh;\n  width: 100%;\n  position: 'fixed';\n  left: 0;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/components/loading/style.module.less":
/*!*******************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/components/loading/style.module.less ***!
  \*******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".loading {\n  margin: 0;\n  padding: 0;\n  height: 100%;\n}\n.loading .page {\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  justify-content: center;\n  height: 100%;\n  position: inherit !important;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/containers/company/style.module.less":
/*!*******************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/containers/company/style.module.less ***!
  \*******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".company {\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  justify-content: center;\n}\n.upload {\n  width: auto;\n  height: auto;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "./node_modules/isomorphic-style-loader/insertCss.js":
/*!***********************************************************!*\
  !*** ./node_modules/isomorphic-style-loader/insertCss.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*! Isomorphic Style Loader | MIT License | https://github.com/kriasoft/isomorphic-style-loader */



var inserted = {};

function b64EncodeUnicode(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
    return String.fromCharCode("0x" + p1);
  }));
}

function removeCss(ids) {
  ids.forEach(function (id) {
    if (--inserted[id] <= 0) {
      var elem = document.getElementById(id);

      if (elem) {
        elem.parentNode.removeChild(elem);
      }
    }
  });
}

function insertCss(styles, _temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$replace = _ref.replace,
      replace = _ref$replace === void 0 ? false : _ref$replace,
      _ref$prepend = _ref.prepend,
      prepend = _ref$prepend === void 0 ? false : _ref$prepend,
      _ref$prefix = _ref.prefix,
      prefix = _ref$prefix === void 0 ? 's' : _ref$prefix;

  var ids = [];

  for (var i = 0; i < styles.length; i++) {
    var _styles$i = styles[i],
        moduleId = _styles$i[0],
        css = _styles$i[1],
        media = _styles$i[2],
        sourceMap = _styles$i[3];
    var id = "" + prefix + moduleId + "-" + i;
    ids.push(id);

    if (inserted[id]) {
      if (!replace) {
        inserted[id]++;
        continue;
      }
    }

    inserted[id] = 1;
    var elem = document.getElementById(id);
    var create = false;

    if (!elem) {
      create = true;
      elem = document.createElement('style');
      elem.setAttribute('type', 'text/css');
      elem.id = id;

      if (media) {
        elem.setAttribute('media', media);
      }
    }

    var cssText = css;

    if (sourceMap && typeof btoa === 'function') {
      cssText += "\n/*# sourceMappingURL=data:application/json;base64," + b64EncodeUnicode(JSON.stringify(sourceMap)) + "*/";
      cssText += "\n/*# sourceURL=" + sourceMap.file + "?" + id + "*/";
    }

    if ('textContent' in elem) {
      elem.textContent = cssText;
    } else {
      elem.styleSheet.cssText = cssText;
    }

    if (create) {
      if (prepend) {
        document.head.insertBefore(elem, document.head.childNodes[0]);
      } else {
        document.head.appendChild(elem);
      }
    }
  }

  return removeCss.bind(null, ids);
}

module.exports = insertCss;
//# sourceMappingURL=insertCss.js.map


/***/ }),

/***/ "./server/index.ts":
/*!*************************!*\
  !*** ./server/index.ts ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var dotenv_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dotenv/config */ "dotenv/config");
/* harmony import */ var dotenv_config__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dotenv_config__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _src_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/app */ "./server/src/app.ts");
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! http */ "http");
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _src_util_normalize__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/util/normalize */ "./server/src/util/normalize.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




class OoJob {
    constructor(app) {
        this.startSyncServer = (port) => __awaiter(this, void 0, void 0, function* () {
            try {
                _src_app__WEBPACK_IMPORTED_MODULE_1__["application"].applyMiddleware();
                const PORT = Object(_src_util_normalize__WEBPACK_IMPORTED_MODULE_3__["normalizePort"])(port);
                this.server.listen(PORT, () => {
                    console.info(`running on port: http://localhost:${port}`);
                });
            }
            catch (error) {
                console.error(new Error('Error Starting OoJob Server ...'));
                console.error(error);
                yield this.stopServer();
            }
        });
        this.stopServer = () => __awaiter(this, void 0, void 0, function* () {
            process.on('SIGINT', () => __awaiter(this, void 0, void 0, function* () {
                console.warn('Closing OoJob Server ...');
                yield _src_app__WEBPACK_IMPORTED_MODULE_1__["application"].closeServer();
                try {
                    this.server.close();
                    console.warn('OoJob Server Closed');
                }
                catch (error) {
                    console.error('Error Closing OoJobServer Server Connection');
                    console.error(error);
                    process.kill(process.pid);
                }
            }));
        });
        this.app = app;
        this.server = Object(http__WEBPACK_IMPORTED_MODULE_2__["createServer"])(app);
        console.info('Initialized OoJobServer');
    }
}
const { startSyncServer, stopServer } = new OoJob(_src_app__WEBPACK_IMPORTED_MODULE_1__["default"]);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    const { PORT } = process.env;
    const port = PORT || '8080';
    try {
        yield stopServer();
        yield startSyncServer(port);
    }
    catch (error) {
        console.error('Server Failed to start');
        console.error(error);
        process.exit(1);
    }
});
start();


/***/ }),

/***/ "./server/src/app.ts":
/*!***************************!*\
  !*** ./server/src/app.ts ***!
  \***************************/
/*! exports provided: application, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "application", function() { return application; });
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./controller */ "./server/src/controller.tsx");
/* harmony import */ var _middleware__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./middleware */ "./server/src/middleware/index.ts");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_3__);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




const BUILD_PATH = path__WEBPACK_IMPORTED_MODULE_3___default.a.resolve(__dirname, 'build');
class App {
    constructor() {
        this.closeServer = () => __awaiter(this, void 0, void 0, function* () {
            console.log('close server');
        });
        this.applyMiddleware = () => {
            Object(_middleware__WEBPACK_IMPORTED_MODULE_2__["default"])(this.app);
        };
        this.app = express__WEBPACK_IMPORTED_MODULE_0___default()();
        this.app.use(express__WEBPACK_IMPORTED_MODULE_0___default.a.static(BUILD_PATH, {}));
        this.app.use(_controller__WEBPACK_IMPORTED_MODULE_1__["baseController"]);
        console.info('Initialized App');
    }
    static bootstrap() {
        return new App();
    }
}
const application = new App();
/* harmony default export */ __webpack_exports__["default"] = (application.app);


/***/ }),

/***/ "./server/src/controller.tsx":
/*!***********************************!*\
  !*** ./server/src/controller.tsx ***!
  \***********************************/
/*! exports provided: baseController */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "baseController", function() { return baseController; });
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @apollo/client */ "@apollo/client");
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_apollo_client__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _src_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../src/app */ "./src/app/index.tsx");
/* harmony import */ var _util_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util/html */ "./server/src/util/html.tsx");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _util_assets__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./util/assets */ "./server/src/util/assets.ts");
/* harmony import */ var node_fetch__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! node-fetch */ "node-fetch");
/* harmony import */ var node_fetch__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(node_fetch__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _apollo_react_ssr__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @apollo/react-ssr */ "@apollo/react-ssr");
/* harmony import */ var _apollo_react_ssr__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_apollo_react_ssr__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-dom/server */ "react-dom/server");
/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_8__);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



// import { Helmet } from 'react-helmet'







const baseController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { REACT_APP_GATEWAY_API } = process.env;
    const client = new _apollo_client__WEBPACK_IMPORTED_MODULE_0__["ApolloClient"]({
        ssrMode: true,
        cache: new _apollo_client__WEBPACK_IMPORTED_MODULE_0__["InMemoryCache"](),
        link: new _apollo_client__WEBPACK_IMPORTED_MODULE_0__["HttpLink"]({
            uri: REACT_APP_GATEWAY_API,
            fetch: (node_fetch__WEBPACK_IMPORTED_MODULE_6___default())
        })
    });
    const app = (react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_apollo_client__WEBPACK_IMPORTED_MODULE_0__["ApolloProvider"], { client: client },
        react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__["StaticRouter"], { location: req.url, context: {} },
            react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_src_app__WEBPACK_IMPORTED_MODULE_1__["default"], null))));
    yield Object(_apollo_react_ssr__WEBPACK_IMPORTED_MODULE_7__["getDataFromTree"])(app);
    const content = Object(react_dom_server__WEBPACK_IMPORTED_MODULE_8__["renderToStaticMarkup"])(app);
    const initialState = client.extract();
    // const helmet = Helmet.renderStatic()
    const data = { content, initialState, helmet: {}, assets: _util_assets__WEBPACK_IMPORTED_MODULE_5__["default"] };
    const html = Object(react_dom_server__WEBPACK_IMPORTED_MODULE_8__["renderToStaticMarkup"])(react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_util_html__WEBPACK_IMPORTED_MODULE_2__["default"], Object.assign({}, data)));
    res.status(200);
    res.send(`<!doctype html>${html}`);
    res.end();
});


/***/ }),

/***/ "./server/src/middleware/index.ts":
/*!****************************************!*\
  !*** ./server/src/middleware/index.ts ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! body-parser */ "body-parser");
/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var compression__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! compression */ "compression");
/* harmony import */ var compression__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(compression__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var helmet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! helmet */ "helmet");
/* harmony import */ var helmet__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(helmet__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var hpp__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! hpp */ "hpp");
/* harmony import */ var hpp__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(hpp__WEBPACK_IMPORTED_MODULE_3__);




const middlewares = (app) => {
    // json encoding and decoding
    app.use(body_parser__WEBPACK_IMPORTED_MODULE_0___default.a.urlencoded({ extended: false }));
    app.use(body_parser__WEBPACK_IMPORTED_MODULE_0___default.a.json());
    // set trusted ip
    app.set('trust proxy', true);
    // do not show powered by express
    app.set('x-powered-by', false);
    // set GZip on headers for request/response
    app.use(compression__WEBPACK_IMPORTED_MODULE_1___default()());
    // security helmet package
    // Don't expose any software information to hackers.
    app.disable('x-powered-by');
    // Express middleware to protect against HTTP Parameter Pollution attacks
    app.use(hpp__WEBPACK_IMPORTED_MODULE_3___default()());
    // The X-Frame-Options header tells browsers to prevent your webpage from being put in an iframe.
    app.use(helmet__WEBPACK_IMPORTED_MODULE_2___default.a.frameguard({ action: 'sameorigin' }));
    // Cross-site scripting, abbreviated to “XSS”, is a way attackers can take over webpages.
    app.use(helmet__WEBPACK_IMPORTED_MODULE_2___default.a.xssFilter());
    // Sets the X-Download-Options to prevent Internet Explorer from executing
    // downloads in your site’s context.
    // @see https://helmetjs.github.io/docs/ienoopen/
    app.use(helmet__WEBPACK_IMPORTED_MODULE_2___default.a.ieNoOpen());
    // Don’t Sniff Mimetype middleware, noSniff, helps prevent browsers from trying
    // to guess (“sniff”) the MIME type, which can have security implications. It
    // does this by setting the X-Content-Type-Options header to nosniff.
    // @see https://helmetjs.github.io/docs/dont-sniff-mimetype/
    app.use(helmet__WEBPACK_IMPORTED_MODULE_2___default.a.noSniff());
};
/* harmony default export */ __webpack_exports__["default"] = (middlewares);


/***/ }),

/***/ "./server/src/util/assets.ts":
/*!***********************************!*\
  !*** ./server/src/util/assets.ts ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ "fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);


const BUILD_PATH = path__WEBPACK_IMPORTED_MODULE_1___default.a.resolve(__dirname, '../build');
const indexHtml = fs__WEBPACK_IMPORTED_MODULE_0___default.a.readFileSync(`${BUILD_PATH}/index.html`, {
    encoding: 'utf-8'
});
const extract = (pattern, string) => {
    const matches = [];
    const re = new RegExp(pattern, 'g');
    let match = re.exec(string);
    while (match !== null) {
        if (match) {
            matches.push(match[1]);
        }
        match = re.exec(string);
    }
    return matches;
};
/* harmony default export */ __webpack_exports__["default"] = ({
    css: extract('<link href="(.+?)" rel="stylesheet">', indexHtml),
    js: extract('<script type="text/javascript" src="(.+?)"></script>', indexHtml)
});


/***/ }),

/***/ "./server/src/util/html.tsx":
/*!**********************************!*\
  !*** ./server/src/util/html.tsx ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const Html = ({ content, helmet, assets, initialState }) => {
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("html", { lang: "en" },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("head", null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("meta", { charSet: "utf-8" }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("meta", { name: "viewport", content: "width=device-width, initial-scale=1, shrink-to-fit=no" }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("meta", { name: "theme-color", content: "#000000" }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("link", { rel: "manifest", href: "/manifest.json" }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("link", { rel: "shortcut icon", href: "/favicon.ico" }),
            assets.css && assets.css.map((c, idx) => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("link", { key: idx, href: c, rel: "stylesheet" }))),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("body", null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("noscript", null, "You need to enable JavaScript to run this app."),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { id: "root", dangerouslySetInnerHTML: { __html: content } }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("script", { dangerouslySetInnerHTML: {
                    __html: `window.__APOLLO_STATE__=${JSON.stringify(initialState).replace(/</g, '\\u003c')}`
                } }),
            assets.js && assets.js.map((j, idx) => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("script", { key: idx, src: j })))));
};
/* harmony default export */ __webpack_exports__["default"] = (Html);


/***/ }),

/***/ "./server/src/util/normalize.ts":
/*!**************************************!*\
  !*** ./server/src/util/normalize.ts ***!
  \**************************************/
/*! exports provided: normalizePort */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalizePort", function() { return normalizePort; });
const normalizePort = (portValue) => {
    const port = parseInt(portValue, 10);
    if (isNaN(port)) {
        return 8080;
    }
    if (port >= 0) {
        return port;
    }
    return port;
};



/***/ }),

/***/ "./src/app/_body.tsx":
/*!***************************!*\
  !*** ./src/app/_body.tsx ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var components_loading__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! components/loading */ "./src/components/loading/index.tsx");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var app_routes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/routes */ "./src/app/routes/index.tsx");




const { Content } = antd__WEBPACK_IMPORTED_MODULE_0__["Layout"];
/**
 * AppBody
 */
const AppBody = () => {
    const { isLoading } = { isLoading: false };
    return (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Layout"], { hasSider: false },
        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Content, null,
            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(components_loading__WEBPACK_IMPORTED_MODULE_1__["default"], { loading: Boolean(isLoading), message: "loading ..." },
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(app_routes__WEBPACK_IMPORTED_MODULE_3__["SecondaryRoutes"], null)))));
};
/* harmony default export */ __webpack_exports__["default"] = (AppBody);


/***/ }),

/***/ "./src/app/_header.tsx":
/*!*****************************!*\
  !*** ./src/app/_header.tsx ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var app_navigation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/navigation */ "./src/app/navigation/index.tsx");
/* harmony import */ var components_loading__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! components/loading */ "./src/components/loading/index.tsx");
/* harmony import */ var app_routes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/routes */ "./src/app/routes/index.tsx");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var app_style_module_less__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/style.module.less */ "./src/app/style.module.less");
/* harmony import */ var app_style_module_less__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(app_style_module_less__WEBPACK_IMPORTED_MODULE_5__);






const { Sider } = antd__WEBPACK_IMPORTED_MODULE_0__["Layout"];
/**
 * AuthenticatedAppNavigation
 */
const AuthenticatedAppNavigation = () => {
    const { user } = {
        user: { picture: "http://dummy.duck", email: "dodo@duck", name: "dummy user" },
    };
    return (react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(Sider, { width: "100%", className: app_style_module_less__WEBPACK_IMPORTED_MODULE_5___default.a.navigation, collapsedWidth: "0", breakpoint: "lg" },
        react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Row"], null,
            react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(app_navigation__WEBPACK_IMPORTED_MODULE_1__["default"], null,
                react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Col"], { span: 6, className: app_style_module_less__WEBPACK_IMPORTED_MODULE_5___default.a.menu },
                    react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(app_navigation__WEBPACK_IMPORTED_MODULE_1__["Primary"], { user: user, isAuthenticated: false }),
                    react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", null, "dodo duck")),
                react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Col"], { span: 18 },
                    react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(app_routes__WEBPACK_IMPORTED_MODULE_3__["PrimaryRoutes"], null))))));
};
/**
 * UnauthenticatedAppNavigation
 * @param param0
 */
const UnauthenticatedAppNavigation = ({ loading }) => react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(Sider, { width: "100%", className: app_style_module_less__WEBPACK_IMPORTED_MODULE_5___default.a.navigation, collapsedWidth: "0", breakpoint: "lg" },
    react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Row"], null,
        react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(app_navigation__WEBPACK_IMPORTED_MODULE_1__["default"], null,
            react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Col"], { span: 6, className: app_style_module_less__WEBPACK_IMPORTED_MODULE_5___default.a.menu },
                react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(components_loading__WEBPACK_IMPORTED_MODULE_2__["default"], { loading: loading },
                    react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(app_navigation__WEBPACK_IMPORTED_MODULE_1__["Primary"], { user: null, isAuthenticated: true }))),
            react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Col"], { span: 18 },
                react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(components_loading__WEBPACK_IMPORTED_MODULE_2__["default"], { loading: loading },
                    react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(app_routes__WEBPACK_IMPORTED_MODULE_3__["PrimaryRoutes"], null))))));
/**
 * AppNavigation
 */
const AppNavigation = () => {
    const { isLoading } = { isLoading: false };
    if (isLoading) {
        return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(UnauthenticatedAppNavigation, { loading: Boolean(isLoading) });
    }
    return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(AuthenticatedAppNavigation, null);
};
/* harmony default export */ __webpack_exports__["default"] = (AppNavigation);


/***/ }),

/***/ "./src/app/contexts/index.tsx":
/*!************************************!*\
  !*** ./src/app/contexts/index.tsx ***!
  \************************************/
/*! exports provided: Contexts, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Contexts", function() { return Contexts; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);


const ContextsBase = ({ children }) => {
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, children));
};
const Contexts = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["withRouter"])(ContextsBase);
/* harmony default export */ __webpack_exports__["default"] = (Contexts);


/***/ }),

/***/ "./src/app/form/job/form.tsx":
/*!***********************************!*\
  !*** ./src/app/form/job/form.tsx ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var components_range__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! components/range */ "./src/components/range/index.tsx");
/* harmony import */ var components_SalaryInput__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! components/SalaryInput */ "./src/components/SalaryInput/index.tsx");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ant-design/icons */ "@ant-design/icons");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons__WEBPACK_IMPORTED_MODULE_4__);





const { Option } = antd__WEBPACK_IMPORTED_MODULE_0__["Select"];
const { Search } = antd__WEBPACK_IMPORTED_MODULE_0__["Input"];
const JobForm = ({ onSubmit }) => {
    const checkSalary = (rule, salary) => {
        if (salary.value > 0) {
            return Promise.resolve();
        }
        return Promise.reject('Price must be greater than zero!');
    };
    const validateRange = (rule, value) => {
        if (!(value.min > 0)) {
            return Promise.reject('Min value must be greater than zero!');
        }
        if (!(value.max > 0)) {
            return Promise.reject('Max values must be greater than zero!');
        }
        if (value.min >= value.max) {
            return Promise.reject('Max value must be greater than Min value');
        }
        return Promise.resolve();
    };
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Form"], { name: "job", onFinish: onSubmit, initialValues: {
            sallary_max: {
                value: 0,
                currency: 'INR',
            },
            sallary: {
                max: 0,
                min: 0
            },
            status: 'ACTIVE',
            type: 'DEFAULT'
        } },
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Form"].Item, { name: "name" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Input"], { placeholder: "Job Name" })),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Form"].Item, { name: "desc" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Input"].TextArea, { rows: 4, placeholder: "Enter Description" })),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Form"].Item, { name: "category" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Select"], { mode: "tags", style: { width: '100%' }, placeholder: "Enter Categories" }, [])),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Form"].Item, { name: "skills_required" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Select"], { mode: "tags", style: { width: '100%' }, placeholder: "Skills Required" }, [])),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Row"], null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Col"], { span: 11 },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Form"].Item, { name: "sallary", label: "Salary Range", rules: [{ validator: validateRange }] },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(components_range__WEBPACK_IMPORTED_MODULE_2__["default"], null))),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Col"], { span: 11, offset: 2 },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Form"].Item, { name: "type", label: "Job Type", style: { padding: '0 2px' } },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Select"], { style: { width: '100%' } },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Option, { value: "DEFAULT" }, "Default"),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Option, { value: "FEATURED" }, "Featured"),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Option, { value: "PREMIUM" }, "Premium"))))),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Row"], null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Col"], { span: 11 },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Form"].Item, { name: "sallary_max", label: "Salary", rules: [{ validator: checkSalary }] },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(components_SalaryInput__WEBPACK_IMPORTED_MODULE_3__["default"], null))),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Col"], { span: 11, offset: 2 },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Form"].Item, { name: "status", label: "Status" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Select"], { style: { width: '100%' } },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Option, { value: "ACTIVE" }, "Active"),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Option, { value: "HOLD" }, "Hold"),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Option, { value: "EXPIRED" }, "Expired"))))),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Form"].Item, { name: "location" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Search, { placeholder: "company Location. ex: Bangalore", loading: true })),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Form"].Item, { name: "attachment", label: "Attachments" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Upload"], null,
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Button"], null,
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_4__["UploadOutlined"], null),
                    " Click to Upload"))),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Form"].Item, null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Button"], { type: "primary", htmlType: "submit" }, "Create"))));
};
/* harmony default export */ __webpack_exports__["default"] = (JobForm);


/***/ }),

/***/ "./src/app/form/payment/form.tsx":
/*!***************************************!*\
  !*** ./src/app/form/payment/form.tsx ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const PaymentForm = () => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null,
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "payment form"),
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "orm goes here"));
/* harmony default export */ __webpack_exports__["default"] = (PaymentForm);


/***/ }),

/***/ "./src/app/index.tsx":
/*!***************************!*\
  !*** ./src/app/index.tsx ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var app_body__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/_body */ "./src/app/_body.tsx");
/* harmony import */ var app_header__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/_header */ "./src/app/_header.tsx");
/* harmony import */ var app_contexts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/contexts */ "./src/app/contexts/index.tsx");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var app_style_module_less__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/style.module.less */ "./src/app/style.module.less");
/* harmony import */ var app_style_module_less__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(app_style_module_less__WEBPACK_IMPORTED_MODULE_5__);






/**
 * AppLayout
 * @param param0
 */
const AppLayout = ({ children }) => react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(app_contexts__WEBPACK_IMPORTED_MODULE_3__["default"], null,
    react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", { className: app_style_module_less__WEBPACK_IMPORTED_MODULE_5___default.a.pageWrapper },
        react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", { className: app_style_module_less__WEBPACK_IMPORTED_MODULE_5___default.a.mainWrapper }, children)));
/**
 * App
 */
const App = () => (react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(AppLayout, null,
    react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Row"], null,
        react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Layout"], { hasSider: true },
            react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Col"], { className: app_style_module_less__WEBPACK_IMPORTED_MODULE_5___default.a.mainMenu, span: 6, xs: 24, sm: 12, md: 10, lg: 8, xl: 6 },
                react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(app_header__WEBPACK_IMPORTED_MODULE_2__["default"], null)),
            react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Col"], { span: 18 },
                react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(app_body__WEBPACK_IMPORTED_MODULE_1__["default"], null))))));
/* harmony default export */ __webpack_exports__["default"] = (App);


/***/ }),

/***/ "./src/app/navigation/index.tsx":
/*!**************************************!*\
  !*** ./src/app/navigation/index.tsx ***!
  \**************************************/
/*! exports provided: NavigationContext, useNavigationContext, Navigation, Primary, RootMenu, CompanyMenu, ProfileMenu, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavigationContext", function() { return NavigationContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useNavigationContext", function() { return useNavigationContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Navigation", function() { return Navigation; });
/* harmony import */ var app_navigation_secondary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! app/navigation/secondary */ "./src/app/navigation/secondary/index.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RootMenu", function() { return app_navigation_secondary__WEBPACK_IMPORTED_MODULE_0__["RootMenu"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CompanyMenu", function() { return app_navigation_secondary__WEBPACK_IMPORTED_MODULE_0__["CompanyMenu"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ProfileMenu", function() { return app_navigation_secondary__WEBPACK_IMPORTED_MODULE_0__["ProfileMenu"]; });

/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var app_navigation_primary__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/navigation/primary */ "./src/app/navigation/primary/index.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Primary", function() { return app_navigation_primary__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_3__);




const NavigationContext = Object(react__WEBPACK_IMPORTED_MODULE_1__["createContext"])({});
const Navigation = (props) => {
    const [route, setRoute] = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])('');
    const value = Object(react__WEBPACK_IMPORTED_MODULE_1__["useMemo"])(() => ({ route, setRoute }), [route]);
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Switch"], null,
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(NavigationContext.Provider, { value: value }, props.children)));
};
const useNavigationContext = () => {
    const context = Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(NavigationContext);
    if (!context) {
        throw new Error('Navigation compound components cannot be rendered outside the Navigation component');
    }
    return context;
};

/* harmony default export */ __webpack_exports__["default"] = (Navigation);


/***/ }),

/***/ "./src/app/navigation/primary/index.tsx":
/*!**********************************************!*\
  !*** ./src/app/navigation/primary/index.tsx ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var containers_company__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! containers/company */ "./src/containers/company/index.tsx");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ant-design/icons */ "@ant-design/icons");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var app_navigation_style_module_less__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/navigation/style.module.less */ "./src/app/navigation/style.module.less");
/* harmony import */ var app_navigation_style_module_less__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(app_navigation_style_module_less__WEBPACK_IMPORTED_MODULE_5__);






const { Sider } = antd__WEBPACK_IMPORTED_MODULE_0__["Layout"];
const Primary = ({ user }) => {
    const [selectedMenu, changeSelectedMenu] = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])('1');
    const [visible, setVisible] = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false);
    const isSelectedMenu = (menuKey) => (selectedMenu === menuKey ? app_navigation_style_module_less__WEBPACK_IMPORTED_MODULE_5___default.a.selected : '');
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Sider, { trigger: null, width: "100%", className: app_navigation_style_module_less__WEBPACK_IMPORTED_MODULE_5___default.a.navigation },
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Menu"], { defaultSelectedKeys: ['1'], mode: "inline", theme: "dark", className: `${app_navigation_style_module_less__WEBPACK_IMPORTED_MODULE_5___default.a.primary}` },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Menu"].Item, { key: "1", title: "oojob", className: isSelectedMenu('1'), onClick: ({ key }) => changeSelectedMenu(key) },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], { to: "/" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Avatar"], { style: { backgroundColor: '#87d068' }, icon: react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_4__["UserOutlined"], null) }))),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Menu"].Item, { key: "2", title: "profile", className: isSelectedMenu('2'), onClick: ({ key }) => changeSelectedMenu(key) },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], { to: "/profile" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Avatar"], null, "P"))),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Menu"].Item, { key: "3", title: "company", className: isSelectedMenu('3'), onClick: ({ key }) => changeSelectedMenu(key) },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], { to: "/company" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Avatar"], null, "C"))),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Menu"].Item, { key: "4", title: "Add A Company" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Button"], { type: "primary", shape: "circle", onClick: () => setVisible(!visible) }, "+"))),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Modal"], { title: "create company", width: 720, closable: false, visible: visible, onCancel: () => setVisible(!visible), footer: null },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(containers_company__WEBPACK_IMPORTED_MODULE_2__["default"], null))));
};
/* harmony default export */ __webpack_exports__["default"] = (Primary);


/***/ }),

/***/ "./src/app/navigation/secondary/index.tsx":
/*!************************************************!*\
  !*** ./src/app/navigation/secondary/index.tsx ***!
  \************************************************/
/*! exports provided: RootMenu, ProfileMenu, CompanyMenu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RootMenu", function() { return RootMenu; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileMenu", function() { return ProfileMenu; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompanyMenu", function() { return CompanyMenu; });
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ant-design/icons */ "@ant-design/icons");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var app_navigation_style_module_less__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/navigation/style.module.less */ "./src/app/navigation/style.module.less");
/* harmony import */ var app_navigation_style_module_less__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(app_navigation_style_module_less__WEBPACK_IMPORTED_MODULE_4__);





const RootMenu = (props) => (react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_2__["Menu"], { theme: "dark", mode: "inline", defaultSelectedKeys: ['1'], className: app_navigation_style_module_less__WEBPACK_IMPORTED_MODULE_4___default.a.secondary },
    react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_2__["Menu"].Item, { key: "1", className: app_navigation_style_module_less__WEBPACK_IMPORTED_MODULE_4___default.a.hovered },
        react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], { to: `${props.location.pathname}/feeds` },
            react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_0__["UserOutlined"], null),
            react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", null, "Root Menu 1"))),
    react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_2__["Menu"].Item, { key: "2", className: app_navigation_style_module_less__WEBPACK_IMPORTED_MODULE_4___default.a.hovered },
        react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_0__["VideoCameraOutlined"], null),
        react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", null, "Root Menu 2")),
    react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_2__["Menu"].Item, { key: "3", className: app_navigation_style_module_less__WEBPACK_IMPORTED_MODULE_4___default.a.hovered },
        react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_0__["UploadOutlined"], null),
        react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", null, "Root Menu 3"))));
const ProfileMenu = (props) => (react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_2__["Menu"], { theme: "dark", mode: "inline", defaultSelectedKeys: ['1'], className: app_navigation_style_module_less__WEBPACK_IMPORTED_MODULE_4___default.a.secondary },
    react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_2__["Menu"].Item, { key: "1", className: app_navigation_style_module_less__WEBPACK_IMPORTED_MODULE_4___default.a.hovered },
        react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_0__["UserOutlined"], null),
        react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], { to: `${props.location.pathname}/feed` }, "profile"))));
const CompanyMenu = (props) => (react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_2__["Menu"], { theme: "dark", mode: "inline", defaultSelectedKeys: ['1'], className: app_navigation_style_module_less__WEBPACK_IMPORTED_MODULE_4___default.a.secondary },
    react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_2__["Menu"].Item, { key: "1", className: app_navigation_style_module_less__WEBPACK_IMPORTED_MODULE_4___default.a.hovered },
        react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_0__["UserOutlined"], null),
        react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], { to: `${props.location.pathname}/feeds` }, "companies")),
    react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_2__["Menu"].Item, { key: "1", className: app_navigation_style_module_less__WEBPACK_IMPORTED_MODULE_4___default.a.hovered },
        react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_0__["UserOutlined"], null),
        react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], { to: `${props.location.pathname}/Jobs` }, "Jobs"))));


/***/ }),

/***/ "./src/app/navigation/style.module.less":
/*!**********************************************!*\
  !*** ./src/app/navigation/style.module.less ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


    var refs = 0;
    var css = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/less-loader/dist/cjs.js!./style.module.less */ "./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/app/navigation/style.module.less");
    var insertCss = __webpack_require__(/*! ../../../node_modules/isomorphic-style-loader/insertCss.js */ "./node_modules/isomorphic-style-loader/insertCss.js");
    var content = typeof css === 'string' ? [[module.i, css, '']] : css;

    exports = module.exports = css.locals || {};
    exports._getContent = function() { return content; };
    exports._getCss = function() { return '' + css; };
    exports._insertCss = function(options) { return insertCss(content, options) };

    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if ( true && typeof window !== 'undefined' && window.document) {
      var removeCss = function() {};
      module.hot.accept(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/less-loader/dist/cjs.js!./style.module.less */ "./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/app/navigation/style.module.less", function() {
        css = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/less-loader/dist/cjs.js!./style.module.less */ "./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/app/navigation/style.module.less");
        content = typeof css === 'string' ? [[module.i, css, '']] : css;
        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ "./src/app/pages/job/page.tsx":
/*!************************************!*\
  !*** ./src/app/pages/job/page.tsx ***!
  \************************************/
/*! exports provided: Job, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Job", function() { return Job; });
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _form_job_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../form/job/form */ "./src/app/form/job/form.tsx");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ant-design/icons */ "@ant-design/icons");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var graph_company_mutatioon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! graph/company/mutatioon */ "./src/graph/company/mutatioon.ts");
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @apollo/client */ "@apollo/client");
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_apollo_client__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_6__);



// import style from 'style.module.less'




const { Content } = antd__WEBPACK_IMPORTED_MODULE_0__["Layout"];
const { Title } = antd__WEBPACK_IMPORTED_MODULE_0__["Typography"];
const JobPage = () => {
    const [visible, setVisible] = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false);
    const [addJob, { loading, data }] = Object(_apollo_client__WEBPACK_IMPORTED_MODULE_5__["useMutation"])(graph_company_mutatioon__WEBPACK_IMPORTED_MODULE_4__["mutationCreateJob"]);
    const onSubmit = (values) => {
        console.log(values);
        // addJob({
        // 	variables: {
        // 		input: {
        // 			company: 'xyz',
        // 			...values
        // 		}
        // 	}
        // })
    };
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Content, { className: "Job-content", style: {
                padding: 24,
                margin: 0,
                minHeight: 280,
            } },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Row"], null,
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Col"], { span: 8 },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Title, { level: 3 }, "JOBS")),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Col"], { span: 8, offset: 8 },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Button"], { type: "primary", shape: "round", icon: react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_3__["PlusCircleOutlined"], null), size: "large", onClick: () => setVisible(!visible) }, "Add A Job"))),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("hr", null)),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Modal"], { title: "Add A Job", width: 720, closable: true, visible: visible, onCancel: () => setVisible(!visible), destroyOnClose: true, footer: null },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_form_job_form__WEBPACK_IMPORTED_MODULE_2__["default"], { onSubmit: onSubmit }))));
};
const Job = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_6__["withRouter"])(JobPage);
/* harmony default export */ __webpack_exports__["default"] = (Job);


/***/ }),

/***/ "./src/app/pages/payment/page.tsx":
/*!****************************************!*\
  !*** ./src/app/pages/payment/page.tsx ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var app_form_payment_form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! app/form/payment/form */ "./src/app/form/payment/form.tsx");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


const Payment = () => (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_form_payment_form__WEBPACK_IMPORTED_MODULE_0__["default"], null)));
/* harmony default export */ __webpack_exports__["default"] = (Payment);


/***/ }),

/***/ "./src/app/pages/profile/page.tsx":
/*!****************************************!*\
  !*** ./src/app/pages/profile/page.tsx ***!
  \****************************************/
/*! exports provided: Profile, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Profile", function() { return Profile; });
/* harmony import */ var components_loading__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! components/loading */ "./src/components/loading/index.tsx");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_2__);



const ProfileBase = () => {
    const { user, isLoading } = {
        user: { picture: "http://dummy.duck", email: "dodo@duck", name: "dummy user" },
        isLoading: false
    };
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(components_loading__WEBPACK_IMPORTED_MODULE_0__["default"], { loading: isLoading || !user },
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", { src: user.picture, alt: "Profile" }),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h2", null, user.name),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", null, user.email),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("code", null, JSON.stringify(user, null, 2))));
};
const Profile = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["withRouter"])(ProfileBase);
/* harmony default export */ __webpack_exports__["default"] = (Profile);


/***/ }),

/***/ "./src/app/pages/test/page.tsx":
/*!*************************************!*\
  !*** ./src/app/pages/test/page.tsx ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const Text = () => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null,
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Test Page ..."));
/* harmony default export */ __webpack_exports__["default"] = (Text);


/***/ }),

/***/ "./src/app/routes/index.tsx":
/*!**********************************!*\
  !*** ./src/app/routes/index.tsx ***!
  \**********************************/
/*! exports provided: PrimaryRoutes, SecondaryRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PrimaryRoutes", function() { return PrimaryRoutes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SecondaryRoutes", function() { return SecondaryRoutes; });
/* harmony import */ var app_navigation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! app/navigation */ "./src/app/navigation/index.tsx");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var app_pages_job_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/pages/job/page */ "./src/app/pages/job/page.tsx");
/* harmony import */ var app_pages_payment_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/pages/payment/page */ "./src/app/pages/payment/page.tsx");
/* harmony import */ var app_pages_profile_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/pages/profile/page */ "./src/app/pages/profile/page.tsx");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var app_pages_test_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/pages/test/page */ "./src/app/pages/test/page.tsx");
/* harmony import */ var app_style_module_less__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/style.module.less */ "./src/app/style.module.less");
/* harmony import */ var app_style_module_less__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(app_style_module_less__WEBPACK_IMPORTED_MODULE_7__);








const PrimaryRoutes = () => react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", { className: app_style_module_less__WEBPACK_IMPORTED_MODULE_7___default.a.routes },
    react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Switch"], null,
        react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], { path: "/", exact: true, component: app_navigation__WEBPACK_IMPORTED_MODULE_0__["RootMenu"] }),
        react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], { path: "/company", component: app_navigation__WEBPACK_IMPORTED_MODULE_0__["CompanyMenu"] })));
const SecondaryRoutes = () => react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", { className: app_style_module_less__WEBPACK_IMPORTED_MODULE_7___default.a.routes },
    react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Switch"], null,
        react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], { path: "/", exact: true, component: app_pages_test_page__WEBPACK_IMPORTED_MODULE_6__["default"] }),
        react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], { path: "/profile/feed", component: app_pages_profile_page__WEBPACK_IMPORTED_MODULE_4__["default"] }),
        react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], { path: "/company/jobs", component: app_pages_job_page__WEBPACK_IMPORTED_MODULE_2__["default"] }),
        react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], { path: "/profile/payment", component: app_pages_payment_page__WEBPACK_IMPORTED_MODULE_3__["default"] })));


/***/ }),

/***/ "./src/app/style.module.less":
/*!***********************************!*\
  !*** ./src/app/style.module.less ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


    var refs = 0;
    var css = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/less-loader/dist/cjs.js!./style.module.less */ "./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/app/style.module.less");
    var insertCss = __webpack_require__(/*! ../../node_modules/isomorphic-style-loader/insertCss.js */ "./node_modules/isomorphic-style-loader/insertCss.js");
    var content = typeof css === 'string' ? [[module.i, css, '']] : css;

    exports = module.exports = css.locals || {};
    exports._getContent = function() { return content; };
    exports._getCss = function() { return '' + css; };
    exports._insertCss = function(options) { return insertCss(content, options) };

    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if ( true && typeof window !== 'undefined' && window.document) {
      var removeCss = function() {};
      module.hot.accept(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/less-loader/dist/cjs.js!./style.module.less */ "./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/app/style.module.less", function() {
        css = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/less-loader/dist/cjs.js!./style.module.less */ "./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/app/style.module.less");
        content = typeof css === 'string' ? [[module.i, css, '']] : css;
        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ "./src/components/SalaryInput/index.tsx":
/*!**********************************************!*\
  !*** ./src/components/SalaryInput/index.tsx ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_1__);


const { Option } = antd__WEBPACK_IMPORTED_MODULE_1__["Select"];
const SalaryInput = ({ salary = {}, onChange }) => {
    const [value, setValue] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(0);
    const [currency, setCurrency] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])('INR');
    const triggerChange = changedValue => {
        if (onChange) {
            onChange(Object.assign(Object.assign({ value, currency }, salary), changedValue));
        }
    };
    const onNumberChange = e => {
        const newValue = parseInt(e.target.value || 0, 10);
        if (Number.isNaN(value)) {
            return;
        }
        if (!('value' in salary)) {
            setValue(newValue);
        }
        triggerChange({ value: newValue });
    };
    const onCurrencyChange = newCurrency => {
        if (!('currency' in salary)) {
            setCurrency(newCurrency);
        }
        triggerChange({ currency: newCurrency });
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__["Input"], { type: "text", value: salary.value || value, onChange: onNumberChange, style: { width: '60%' } }),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__["Select"], { value: salary.currency || currency, style: { width: '40%' }, onChange: onCurrencyChange },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Option, { value: "INR" }, "INR"),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Option, { value: "USD" }, "USD"))));
};
/* harmony default export */ __webpack_exports__["default"] = (SalaryInput);


/***/ }),

/***/ "./src/components/loading/index.tsx":
/*!******************************************!*\
  !*** ./src/components/loading/index.tsx ***!
  \******************************************/
/*! exports provided: loadingIcon, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadingIcon", function() { return loadingIcon; });
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ant-design/icons */ "@ant-design/icons");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var components_loading_style_module_less__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! components/loading/style.module.less */ "./src/components/loading/style.module.less");
/* harmony import */ var components_loading_style_module_less__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(components_loading_style_module_less__WEBPACK_IMPORTED_MODULE_3__);




const loadingIcon = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_0__["LoadingOutlined"], { style: { fontSize: 24 }, spin: true });
const Loading = ({ children, loading, message }) => (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: components_loading_style_module_less__WEBPACK_IMPORTED_MODULE_3___default.a.loading },
    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_2__["Spin"], { indicator: loadingIcon, tip: message, delay: 500, className: components_loading_style_module_less__WEBPACK_IMPORTED_MODULE_3___default.a.page, spinning: loading }, children)));
/* harmony default export */ __webpack_exports__["default"] = (Loading);


/***/ }),

/***/ "./src/components/loading/style.module.less":
/*!**************************************************!*\
  !*** ./src/components/loading/style.module.less ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


    var refs = 0;
    var css = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/less-loader/dist/cjs.js!./style.module.less */ "./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/components/loading/style.module.less");
    var insertCss = __webpack_require__(/*! ../../../node_modules/isomorphic-style-loader/insertCss.js */ "./node_modules/isomorphic-style-loader/insertCss.js");
    var content = typeof css === 'string' ? [[module.i, css, '']] : css;

    exports = module.exports = css.locals || {};
    exports._getContent = function() { return content; };
    exports._getCss = function() { return '' + css; };
    exports._insertCss = function(options) { return insertCss(content, options) };

    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if ( true && typeof window !== 'undefined' && window.document) {
      var removeCss = function() {};
      module.hot.accept(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/less-loader/dist/cjs.js!./style.module.less */ "./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/components/loading/style.module.less", function() {
        css = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/less-loader/dist/cjs.js!./style.module.less */ "./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/components/loading/style.module.less");
        content = typeof css === 'string' ? [[module.i, css, '']] : css;
        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ "./src/components/range/index.tsx":
/*!****************************************!*\
  !*** ./src/components/range/index.tsx ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_1__);


const Range = ({ value = {}, onChange }) => {
    const [min, setMin] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(0);
    const [max, setMax] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(0);
    const triggerChange = (changedValue) => {
        if (onChange) {
            onChange(Object.assign(Object.assign({ min,
                max }, value), changedValue));
        }
    };
    const onMinChange = (min) => {
        if (min) {
            setMin(min);
            triggerChange({
                min
            });
        }
    };
    const onMaxChange = (max) => {
        if (max) {
            if (!('max' in value)) {
                setMax(max);
            }
            triggerChange({
                max
            });
        }
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__["InputNumber"], { value: value.min || min, onChange: onMinChange, style: { display: 'inline-block', width: 'calc(50% - 8px)' }, placeholder: "Min" }),
        ' ',
        "-",
        ' ',
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__["InputNumber"], { value: value.max || max, onChange: onMaxChange, style: { display: 'inline-block', width: 'calc(50% - 8px)' }, placeholder: "Max" })));
};
/* harmony default export */ __webpack_exports__["default"] = (Range);


/***/ }),

/***/ "./src/containers/company/index.tsx":
/*!******************************************!*\
  !*** ./src/containers/company/index.tsx ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var components_loading__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! components/loading */ "./src/components/loading/index.tsx");
/* harmony import */ var components_range__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! components/range */ "./src/components/range/index.tsx");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var antd_lib_input_Search__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! antd/lib/input/Search */ "antd/lib/input/Search");
/* harmony import */ var antd_lib_input_Search__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(antd_lib_input_Search__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var containers_company_upload__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! containers/company/upload */ "./src/containers/company/upload/index.tsx");
/* harmony import */ var graph_company_mutatioon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! graph/company/mutatioon */ "./src/graph/company/mutatioon.ts");
/* harmony import */ var containers_company_style_module_less__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! containers/company/style.module.less */ "./src/containers/company/style.module.less");
/* harmony import */ var containers_company_style_module_less__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(containers_company_style_module_less__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @apollo/client */ "@apollo/client");
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_apollo_client__WEBPACK_IMPORTED_MODULE_8__);









const Company = () => {
    const [addCompany, { loading, data }] = Object(_apollo_client__WEBPACK_IMPORTED_MODULE_8__["useMutation"])(graph_company_mutatioon__WEBPACK_IMPORTED_MODULE_6__["mutationCreateCompany"]);
    const onSubmit = (values) => {
        addCompany({
            variables: {
                input: Object.assign({ createdBy: '123456789' }, values)
            }
        });
    };
    const validateRange = (rule, value) => {
        if (!(value.min > 0)) {
            return Promise.reject('Min value must be greater than zero!');
        }
        if (!(value.max > 0)) {
            return Promise.reject('Max values must be greater than zero!');
        }
        if (value.min >= value.max) {
            return Promise.reject('Max value must be greater than Min value');
        }
        return Promise.resolve();
    };
    return (react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_loading__WEBPACK_IMPORTED_MODULE_1__["default"], { loading: loading },
        react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Row"], null,
            react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Col"], { span: 10, className: containers_company_style_module_less__WEBPACK_IMPORTED_MODULE_7___default.a.company },
                react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(containers_company_upload__WEBPACK_IMPORTED_MODULE_5__["default"], null),
                react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", null, "upload your company logo")),
            react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Col"], { span: 14 },
                react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Form"], { name: "company", onFinish: onSubmit, initialValues: {
                        noOfEmployees: {
                            min: 0,
                            max: 0
                        }
                    } },
                    react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Form"].Item, { name: "name" },
                        react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Input"], { placeholder: "Company Name" })),
                    react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Form"].Item, { name: "description" },
                        react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Input"].TextArea, { rows: 4, placeholder: "Enter description for your company" })),
                    react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Form"].Item, { name: "url" },
                        react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Input"], { type: "url", defaultValue: "mysite.com" })),
                    react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Form"].Item, { name: "skills" },
                        react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Select"], { mode: "tags", style: { width: '100%' }, placeholder: "Skills your company demand ?" }, [])),
                    react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Form"].Item, { name: "noOfEmployees", label: "No. of Employees", rules: [{ validator: validateRange }] },
                        react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_range__WEBPACK_IMPORTED_MODULE_2__["default"], null)),
                    react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Form"].Item, { name: "hiringStatus", valuePropName: "checked" },
                        react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Checkbox"], null, "Hiring Status")),
                    react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Form"].Item, { name: "location" },
                        react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(antd_lib_input_Search__WEBPACK_IMPORTED_MODULE_4___default.a, { placeholder: "company Location. ex: Bangalore", loading: true })),
                    react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Form"].Item, null,
                        react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Button"], { type: "primary", htmlType: "submit" }, "Create")))))));
};
/* harmony default export */ __webpack_exports__["default"] = (Company);


/***/ }),

/***/ "./src/containers/company/style.module.less":
/*!**************************************************!*\
  !*** ./src/containers/company/style.module.less ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


    var refs = 0;
    var css = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/less-loader/dist/cjs.js!./style.module.less */ "./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/containers/company/style.module.less");
    var insertCss = __webpack_require__(/*! ../../../node_modules/isomorphic-style-loader/insertCss.js */ "./node_modules/isomorphic-style-loader/insertCss.js");
    var content = typeof css === 'string' ? [[module.i, css, '']] : css;

    exports = module.exports = css.locals || {};
    exports._getContent = function() { return content; };
    exports._getCss = function() { return '' + css; };
    exports._insertCss = function(options) { return insertCss(content, options) };

    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if ( true && typeof window !== 'undefined' && window.document) {
      var removeCss = function() {};
      module.hot.accept(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/less-loader/dist/cjs.js!./style.module.less */ "./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/containers/company/style.module.less", function() {
        css = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/less-loader/dist/cjs.js!./style.module.less */ "./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/containers/company/style.module.less");
        content = typeof css === 'string' ? [[module.i, css, '']] : css;
        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ "./src/containers/company/upload/index.tsx":
/*!*************************************************!*\
  !*** ./src/containers/company/upload/index.tsx ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ant-design/icons */ "@ant-design/icons");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var containers_company_style_module_less__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! containers/company/style.module.less */ "./src/containers/company/style.module.less");
/* harmony import */ var containers_company_style_module_less__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(containers_company_style_module_less__WEBPACK_IMPORTED_MODULE_3__);




function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}
function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        antd__WEBPACK_IMPORTED_MODULE_1__["message"].error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        antd__WEBPACK_IMPORTED_MODULE_1__["message"].error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}
class UploadCompanyPicture extends react__WEBPACK_IMPORTED_MODULE_2___default.a.Component {
    constructor() {
        super(...arguments);
        this.state = {
            loading: false,
            imageUrl: ''
        };
        this.handleChange = info => {
            if (info.file.status === 'uploading') {
                this.setState({ loading: true });
                return;
            }
            if (info.file.status === 'done') {
                getBase64(info.file.originFileObj, imageUrl => this.setState({
                    imageUrl,
                    loading: false,
                }));
            }
        };
    }
    render() {
        const uploadButton = (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", null,
            this.state.loading ? react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_0__["LoadingOutlined"], null) : react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_0__["PlusOutlined"], null),
            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "ant-upload-text" }, "Upload")));
        const { imageUrl } = this.state;
        return (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__["Upload"], { className: containers_company_style_module_less__WEBPACK_IMPORTED_MODULE_3___default.a.upload, name: "avatar", listType: "picture-card", showUploadList: false, action: "https://www.mocky.io/v2/5cc8019d300000980a055e76", beforeUpload: beforeUpload, onChange: this.handleChange }, imageUrl ? react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("img", { src: imageUrl, alt: "avatar", style: { width: '100%' } }) : uploadButton));
    }
}
/* harmony default export */ __webpack_exports__["default"] = (UploadCompanyPicture);


/***/ }),

/***/ "./src/graph/company/mutatioon.ts":
/*!****************************************!*\
  !*** ./src/graph/company/mutatioon.ts ***!
  \****************************************/
/*! exports provided: mutationCreateCompany, mutationCreateJob */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mutationCreateCompany", function() { return mutationCreateCompany; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mutationCreateJob", function() { return mutationCreateJob; });
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @apollo/client */ "@apollo/client");
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_apollo_client__WEBPACK_IMPORTED_MODULE_0__);

const mutationCreateCompany = _apollo_client__WEBPACK_IMPORTED_MODULE_0__["gql"] `
	mutation CreateCompany($input: CompanyInput!) {
		CreateCompany(input: $input) {
			id
		}
	}
`;
const mutationCreateJob = _apollo_client__WEBPACK_IMPORTED_MODULE_0__["gql"] `
	mutation CreateJob($input: JobInput!) {
		CreateJob(input: $input) {
			id
		}
	}
`;


/***/ }),

/***/ 0:
/*!*******************************!*\
  !*** multi ./server/index.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./server/index.ts */"./server/index.ts");


/***/ }),

/***/ "@ant-design/icons":
/*!************************************!*\
  !*** external "@ant-design/icons" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@ant-design/icons");

/***/ }),

/***/ "@apollo/client":
/*!*********************************!*\
  !*** external "@apollo/client" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@apollo/client");

/***/ }),

/***/ "@apollo/react-ssr":
/*!************************************!*\
  !*** external "@apollo/react-ssr" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@apollo/react-ssr");

/***/ }),

/***/ "antd":
/*!***********************!*\
  !*** external "antd" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("antd");

/***/ }),

/***/ "antd/lib/input/Search":
/*!****************************************!*\
  !*** external "antd/lib/input/Search" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("antd/lib/input/Search");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),

/***/ "compression":
/*!******************************!*\
  !*** external "compression" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),

/***/ "dotenv/config":
/*!********************************!*\
  !*** external "dotenv/config" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("dotenv/config");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "helmet":
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("helmet");

/***/ }),

/***/ "hpp":
/*!**********************!*\
  !*** external "hpp" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("hpp");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "node-fetch":
/*!*****************************!*\
  !*** external "node-fetch" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("node-fetch");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),

/***/ "react-router-dom":
/*!***********************************!*\
  !*** external "react-router-dom" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9uYXZpZ2F0aW9uL3N0eWxlLm1vZHVsZS5sZXNzIiwid2VicGFjazovLy8uL3NyYy9hcHAvc3R5bGUubW9kdWxlLmxlc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvbG9hZGluZy9zdHlsZS5tb2R1bGUubGVzcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGFpbmVycy9jb21wYW55L3N0eWxlLm1vZHVsZS5sZXNzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2luc2VydENzcy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3NyYy9hcHAudHMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3NyYy9jb250cm9sbGVyLnRzeCIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvc3JjL21pZGRsZXdhcmUvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3NyYy91dGlsL2Fzc2V0cy50cyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvc3JjL3V0aWwvaHRtbC50c3giLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3NyYy91dGlsL25vcm1hbGl6ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL19ib2R5LnRzeCIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL19oZWFkZXIudHN4Iiwid2VicGFjazovLy8uL3NyYy9hcHAvY29udGV4dHMvaW5kZXgudHN4Iiwid2VicGFjazovLy8uL3NyYy9hcHAvZm9ybS9qb2IvZm9ybS50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9mb3JtL3BheW1lbnQvZm9ybS50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9pbmRleC50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9uYXZpZ2F0aW9uL2luZGV4LnRzeCIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL25hdmlnYXRpb24vcHJpbWFyeS9pbmRleC50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9uYXZpZ2F0aW9uL3NlY29uZGFyeS9pbmRleC50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9uYXZpZ2F0aW9uL3N0eWxlLm1vZHVsZS5sZXNzPzUxZDMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9wYWdlcy9qb2IvcGFnZS50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9wYWdlcy9wYXltZW50L3BhZ2UudHN4Iiwid2VicGFjazovLy8uL3NyYy9hcHAvcGFnZXMvcHJvZmlsZS9wYWdlLnRzeCIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL3BhZ2VzL3Rlc3QvcGFnZS50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9yb3V0ZXMvaW5kZXgudHN4Iiwid2VicGFjazovLy8uL3NyYy9hcHAvc3R5bGUubW9kdWxlLmxlc3M/ZDE0NiIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9TYWxhcnlJbnB1dC9pbmRleC50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvbG9hZGluZy9pbmRleC50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvbG9hZGluZy9zdHlsZS5tb2R1bGUubGVzcz80MjE0Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3JhbmdlL2luZGV4LnRzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGFpbmVycy9jb21wYW55L2luZGV4LnRzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGFpbmVycy9jb21wYW55L3N0eWxlLm1vZHVsZS5sZXNzP2U3NGIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRhaW5lcnMvY29tcGFueS91cGxvYWQvaW5kZXgudHN4Iiwid2VicGFjazovLy8uL3NyYy9ncmFwaC9jb21wYW55L211dGF0aW9vbi50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAYW50LWRlc2lnbi9pY29uc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBhcG9sbG8vY2xpZW50XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiQGFwb2xsby9yZWFjdC1zc3JcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJhbnRkXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYW50ZC9saWIvaW5wdXQvU2VhcmNoXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYm9keS1wYXJzZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjb21wcmVzc2lvblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImRvdGVudi9jb25maWdcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJleHByZXNzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZnNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJoZWxtZXRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJocHBcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJodHRwXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibm9kZS1mZXRjaFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInBhdGhcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LWRvbS9zZXJ2ZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1yb3V0ZXItZG9tXCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQSxJQUFJO1FBQ0o7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxNQUFNO1FBQ047UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsTUFBTTtRQUNOO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxLQUFLOztRQUVMO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLDZCQUE2QjtRQUM3Qiw2QkFBNkI7UUFDN0I7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EscUJBQXFCLGdCQUFnQjtRQUNyQztRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7UUFDQTtRQUNBLHFCQUFxQixnQkFBZ0I7UUFDckM7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTtRQUNBO1FBQ0EsS0FBSzs7UUFFTDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBO1FBQ0E7UUFDQSxLQUFLOztRQUVMO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQSxrQkFBa0IsOEJBQThCO1FBQ2hEO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxJQUFJO1FBQ0o7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSxJQUFJO1FBQ0o7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxNQUFNO1FBQ047UUFDQTtRQUNBO1FBQ0EsT0FBTztRQUNQO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsSUFBSTtRQUNKO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxvQkFBb0IsMkJBQTJCO1FBQy9DO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxPQUFPO1FBQ1A7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLG1CQUFtQixjQUFjO1FBQ2pDO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7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LGtEQUFHO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPLDBCQUEwQixrREFBRztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2RBLDhDOzs7Ozs7Ozs7OztBQ0FBLDJDOzs7Ozs7Ozs7OztBQ0FBLDhDOzs7Ozs7Ozs7OztBQ0FBLGlDOzs7Ozs7Ozs7OztBQ0FBLGtEOzs7Ozs7Ozs7OztBQ0FBLHdDOzs7Ozs7Ozs7OztBQ0FBLHdDOzs7Ozs7Ozs7OztBQ0FBLDBDOzs7Ozs7Ozs7OztBQ0FBLG9DOzs7Ozs7Ozs7OztBQ0FBLCtCOzs7Ozs7Ozs7OztBQ0FBLG1DOzs7Ozs7Ozs7OztBQ0FBLGdDOzs7Ozs7Ozs7OztBQ0FBLGlDOzs7Ozs7Ozs7OztBQ0FBLHVDOzs7Ozs7Ozs7OztBQ0FBLGlDOzs7Ozs7Ozs7OztBQ0FBLGtDOzs7Ozs7Ozs7OztBQ0FBLDZDOzs7Ozs7Ozs7OztBQ0FBLDZDIiwiZmlsZSI6InNlcnZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdHZhciBjaHVuayA9IHJlcXVpcmUoXCIuL1wiICsgXCIuaG90L1wiICsgY2h1bmtJZCArIFwiLlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzXCIpO1xuIFx0XHRob3RBZGRVcGRhdGVDaHVuayhjaHVuay5pZCwgY2h1bmsubW9kdWxlcyk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRNYW5pZmVzdCgpIHtcbiBcdFx0dHJ5IHtcbiBcdFx0XHR2YXIgdXBkYXRlID0gcmVxdWlyZShcIi4vXCIgKyBcIi5ob3QvXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNvblwiKTtcbiBcdFx0fSBjYXRjaCAoZSkge1xuIFx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiBcdFx0fVxuIFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHVwZGF0ZSk7XG4gXHR9XG5cbiBcdC8vZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRkZWxldGUgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0fVxuXG4gXHR2YXIgaG90QXBwbHlPblVwZGF0ZSA9IHRydWU7XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50SGFzaCA9IFwiYTM1OGU3M2U2NWFmZTU1MjBlM2FcIjtcbiBcdHZhciBob3RSZXF1ZXN0VGltZW91dCA9IDEwMDAwO1xuIFx0dmFyIGhvdEN1cnJlbnRNb2R1bGVEYXRhID0ge307XG4gXHR2YXIgaG90Q3VycmVudENoaWxkTW9kdWxlO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IFtdO1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIG1lID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdGlmICghbWUpIHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fO1xuIFx0XHR2YXIgZm4gPSBmdW5jdGlvbihyZXF1ZXN0KSB7XG4gXHRcdFx0aWYgKG1lLmhvdC5hY3RpdmUpIHtcbiBcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdKSB7XG4gXHRcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLnB1c2gobW9kdWxlSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHJlcXVlc3Q7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobWUuY2hpbGRyZW4uaW5kZXhPZihyZXF1ZXN0KSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0bWUuY2hpbGRyZW4ucHVzaChyZXF1ZXN0KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArXG4gXHRcdFx0XHRcdFx0cmVxdWVzdCArXG4gXHRcdFx0XHRcdFx0XCIpIGZyb20gZGlzcG9zZWQgbW9kdWxlIFwiICtcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0KTtcbiBcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHJlcXVlc3QpO1xuIFx0XHR9O1xuIFx0XHR2YXIgT2JqZWN0RmFjdG9yeSA9IGZ1bmN0aW9uIE9iamVjdEZhY3RvcnkobmFtZSkge1xuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX19bbmFtZV07XG4gXHRcdFx0XHR9LFxuIFx0XHRcdFx0c2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuIFx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdID0gdmFsdWU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fTtcbiBcdFx0fTtcbiBcdFx0Zm9yICh2YXIgbmFtZSBpbiBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKF9fd2VicGFja19yZXF1aXJlX18sIG5hbWUpICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcImVcIiAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJ0XCJcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgbmFtZSwgT2JqZWN0RmFjdG9yeShuYW1lKSk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGZuLmUgPSBmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJyZWFkeVwiKSBob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdGhvdENodW5rc0xvYWRpbmcrKztcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5lKGNodW5rSWQpLnRoZW4oZmluaXNoQ2h1bmtMb2FkaW5nLCBmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdGZpbmlzaENodW5rTG9hZGluZygpO1xuIFx0XHRcdFx0dGhyb3cgZXJyO1xuIFx0XHRcdH0pO1xuXG4gXHRcdFx0ZnVuY3Rpb24gZmluaXNoQ2h1bmtMb2FkaW5nKCkge1xuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZy0tO1xuIFx0XHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIpIHtcbiBcdFx0XHRcdFx0aWYgKCFob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoaG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJiBob3RXYWl0aW5nRmlsZXMgPT09IDApIHtcbiBcdFx0XHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH07XG4gXHRcdGZuLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRcdGlmIChtb2RlICYgMSkgdmFsdWUgPSBmbih2YWx1ZSk7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18udCh2YWx1ZSwgbW9kZSAmIH4xKTtcbiBcdFx0fTtcbiBcdFx0cmV0dXJuIGZuO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgaG90ID0ge1xuIFx0XHRcdC8vIHByaXZhdGUgc3R1ZmZcbiBcdFx0XHRfYWNjZXB0ZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9kZWNsaW5lZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X3NlbGZBY2NlcHRlZDogZmFsc2UsXG4gXHRcdFx0X3NlbGZEZWNsaW5lZDogZmFsc2UsXG4gXHRcdFx0X2Rpc3Bvc2VIYW5kbGVyczogW10sXG4gXHRcdFx0X21haW46IGhvdEN1cnJlbnRDaGlsZE1vZHVsZSAhPT0gbW9kdWxlSWQsXG5cbiBcdFx0XHQvLyBNb2R1bGUgQVBJXG4gXHRcdFx0YWN0aXZlOiB0cnVlLFxuIFx0XHRcdGFjY2VwdDogZnVuY3Rpb24oZGVwLCBjYWxsYmFjaykge1xuIFx0XHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZBY2NlcHRlZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcImZ1bmN0aW9uXCIpIGhvdC5fc2VsZkFjY2VwdGVkID0gZGVwO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBbaV1dID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBdID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRlY2xpbmU6IGZ1bmN0aW9uKGRlcCkge1xuIFx0XHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZEZWNsaW5lZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcF0gPSB0cnVlO1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGlzcG9zZTogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZURpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdC5fZGlzcG9zZUhhbmRsZXJzLmluZGV4T2YoY2FsbGJhY2spO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly8gTWFuYWdlbWVudCBBUElcbiBcdFx0XHRjaGVjazogaG90Q2hlY2ssXG4gXHRcdFx0YXBwbHk6IGhvdEFwcGx5LFxuIFx0XHRcdHN0YXR1czogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aWYgKCFsKSByZXR1cm4gaG90U3RhdHVzO1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZFN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90U3RhdHVzSGFuZGxlcnMuaW5kZXhPZihsKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90U3RhdHVzSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vaW5oZXJpdCBmcm9tIHByZXZpb3VzIGRpc3Bvc2UgY2FsbFxuIFx0XHRcdGRhdGE6IGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXVxuIFx0XHR9O1xuIFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSB1bmRlZmluZWQ7XG4gXHRcdHJldHVybiBob3Q7XG4gXHR9XG5cbiBcdHZhciBob3RTdGF0dXNIYW5kbGVycyA9IFtdO1xuIFx0dmFyIGhvdFN0YXR1cyA9IFwiaWRsZVwiO1xuXG4gXHRmdW5jdGlvbiBob3RTZXRTdGF0dXMobmV3U3RhdHVzKSB7XG4gXHRcdGhvdFN0YXR1cyA9IG5ld1N0YXR1cztcbiBcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBob3RTdGF0dXNIYW5kbGVycy5sZW5ndGg7IGkrKylcbiBcdFx0XHRob3RTdGF0dXNIYW5kbGVyc1tpXS5jYWxsKG51bGwsIG5ld1N0YXR1cyk7XG4gXHR9XG5cbiBcdC8vIHdoaWxlIGRvd25sb2FkaW5nXG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzID0gMDtcbiBcdHZhciBob3RDaHVua3NMb2FkaW5nID0gMDtcbiBcdHZhciBob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdEF2YWlsYWJsZUZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90RGVmZXJyZWQ7XG5cbiBcdC8vIFRoZSB1cGRhdGUgaW5mb1xuIFx0dmFyIGhvdFVwZGF0ZSwgaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0ZnVuY3Rpb24gdG9Nb2R1bGVJZChpZCkge1xuIFx0XHR2YXIgaXNOdW1iZXIgPSAraWQgKyBcIlwiID09PSBpZDtcbiBcdFx0cmV0dXJuIGlzTnVtYmVyID8gK2lkIDogaWQ7XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdENoZWNrKGFwcGx5KSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwiaWRsZVwiKSB7XG4gXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiY2hlY2soKSBpcyBvbmx5IGFsbG93ZWQgaW4gaWRsZSBzdGF0dXNcIik7XG4gXHRcdH1cbiBcdFx0aG90QXBwbHlPblVwZGF0ZSA9IGFwcGx5O1xuIFx0XHRob3RTZXRTdGF0dXMoXCJjaGVja1wiKTtcbiBcdFx0cmV0dXJuIGhvdERvd25sb2FkTWFuaWZlc3QoaG90UmVxdWVzdFRpbWVvdXQpLnRoZW4oZnVuY3Rpb24odXBkYXRlKSB7XG4gXHRcdFx0aWYgKCF1cGRhdGUpIHtcbiBcdFx0XHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdFx0XHRyZXR1cm4gbnVsbDtcbiBcdFx0XHR9XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RBdmFpbGFibGVGaWxlc01hcCA9IHVwZGF0ZS5jO1xuIFx0XHRcdGhvdFVwZGF0ZU5ld0hhc2ggPSB1cGRhdGUuaDtcblxuIFx0XHRcdGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdGhvdERlZmVycmVkID0ge1xuIFx0XHRcdFx0XHRyZXNvbHZlOiByZXNvbHZlLFxuIFx0XHRcdFx0XHRyZWplY3Q6IHJlamVjdFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHRob3RVcGRhdGUgPSB7fTtcbiBcdFx0XHR2YXIgY2h1bmtJZCA9IFwibWFpblwiO1xuIFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1sb25lLWJsb2Nrc1xuIFx0XHRcdHtcbiBcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiICYmXG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nID09PSAwICYmXG4gXHRcdFx0XHRob3RXYWl0aW5nRmlsZXMgPT09IDBcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIHByb21pc2U7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gfHwgIWhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdKVxuIFx0XHRcdHJldHVybjtcbiBcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSBmYWxzZTtcbiBcdFx0Zm9yICh2YXIgbW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmICgtLWhvdFdhaXRpbmdGaWxlcyA9PT0gMCAmJiBob3RDaHVua3NMb2FkaW5nID09PSAwKSB7XG4gXHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0aWYgKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlcysrO1xuIFx0XHRcdGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90VXBkYXRlRG93bmxvYWRlZCgpIHtcbiBcdFx0aG90U2V0U3RhdHVzKFwicmVhZHlcIik7XG4gXHRcdHZhciBkZWZlcnJlZCA9IGhvdERlZmVycmVkO1xuIFx0XHRob3REZWZlcnJlZCA9IG51bGw7XG4gXHRcdGlmICghZGVmZXJyZWQpIHJldHVybjtcbiBcdFx0aWYgKGhvdEFwcGx5T25VcGRhdGUpIHtcbiBcdFx0XHQvLyBXcmFwIGRlZmVycmVkIG9iamVjdCBpbiBQcm9taXNlIHRvIG1hcmsgaXQgYXMgYSB3ZWxsLWhhbmRsZWQgUHJvbWlzZSB0b1xuIFx0XHRcdC8vIGF2b2lkIHRyaWdnZXJpbmcgdW5jYXVnaHQgZXhjZXB0aW9uIHdhcm5pbmcgaW4gQ2hyb21lLlxuIFx0XHRcdC8vIFNlZSBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD00NjU2NjZcbiBcdFx0XHRQcm9taXNlLnJlc29sdmUoKVxuIFx0XHRcdFx0LnRoZW4oZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBob3RBcHBseShob3RBcHBseU9uVXBkYXRlKTtcbiBcdFx0XHRcdH0pXG4gXHRcdFx0XHQudGhlbihcbiBcdFx0XHRcdFx0ZnVuY3Rpb24ocmVzdWx0KSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShyZXN1bHQpO1xuIFx0XHRcdFx0XHR9LFxuIFx0XHRcdFx0XHRmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZWplY3QoZXJyKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0KTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHRvTW9kdWxlSWQoaWQpKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEFwcGx5KG9wdGlvbnMpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJyZWFkeVwiKVxuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImFwcGx5KCkgaXMgb25seSBhbGxvd2VkIGluIHJlYWR5IHN0YXR1c1wiKTtcbiBcdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiBcdFx0dmFyIGNiO1xuIFx0XHR2YXIgaTtcbiBcdFx0dmFyIGo7XG4gXHRcdHZhciBtb2R1bGU7XG4gXHRcdHZhciBtb2R1bGVJZDtcblxuIFx0XHRmdW5jdGlvbiBnZXRBZmZlY3RlZFN0dWZmKHVwZGF0ZU1vZHVsZUlkKSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFt1cGRhdGVNb2R1bGVJZF07XG4gXHRcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG5cbiBcdFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMubWFwKGZ1bmN0aW9uKGlkKSB7XG4gXHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRjaGFpbjogW2lkXSxcbiBcdFx0XHRcdFx0aWQ6IGlkXG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0XHR2YXIgcXVldWVJdGVtID0gcXVldWUucG9wKCk7XG4gXHRcdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZUl0ZW0uaWQ7XG4gXHRcdFx0XHR2YXIgY2hhaW4gPSBxdWV1ZUl0ZW0uY2hhaW47XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmICghbW9kdWxlIHx8IG1vZHVsZS5ob3QuX3NlbGZBY2NlcHRlZCkgY29udGludWU7XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fc2VsZkRlY2xpbmVkKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX21haW4pIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInVuYWNjZXB0ZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1vZHVsZS5wYXJlbnRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdHZhciBwYXJlbnRJZCA9IG1vZHVsZS5wYXJlbnRzW2ldO1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50ID0gaW5zdGFsbGVkTW9kdWxlc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdGlmICghcGFyZW50KSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcImRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0cGFyZW50SWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAob3V0ZGF0ZWRNb2R1bGVzLmluZGV4T2YocGFyZW50SWQpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSlcbiBcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSwgW21vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdFx0Y29udGludWU7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2gocGFyZW50SWQpO1xuIFx0XHRcdFx0XHRxdWV1ZS5wdXNoKHtcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdGlkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG5cbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0dHlwZTogXCJhY2NlcHRlZFwiLFxuIFx0XHRcdFx0bW9kdWxlSWQ6IHVwZGF0ZU1vZHVsZUlkLFxuIFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzOiBvdXRkYXRlZE1vZHVsZXMsXG4gXHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llczogb3V0ZGF0ZWREZXBlbmRlbmNpZXNcbiBcdFx0XHR9O1xuIFx0XHR9XG5cbiBcdFx0ZnVuY3Rpb24gYWRkQWxsVG9TZXQoYSwgYikge1xuIFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYi5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0dmFyIGl0ZW0gPSBiW2ldO1xuIFx0XHRcdFx0aWYgKGEuaW5kZXhPZihpdGVtKSA9PT0gLTEpIGEucHVzaChpdGVtKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBhdCBiZWdpbiBhbGwgdXBkYXRlcyBtb2R1bGVzIGFyZSBvdXRkYXRlZFxuIFx0XHQvLyB0aGUgXCJvdXRkYXRlZFwiIHN0YXR1cyBjYW4gcHJvcGFnYXRlIHRvIHBhcmVudHMgaWYgdGhleSBkb24ndCBhY2NlcHQgdGhlIGNoaWxkcmVuXG4gXHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuIFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdHZhciBhcHBsaWVkVXBkYXRlID0ge307XG5cbiBcdFx0dmFyIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSA9IGZ1bmN0aW9uIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSgpIHtcbiBcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArIHJlc3VsdC5tb2R1bGVJZCArIFwiKSB0byBkaXNwb3NlZCBtb2R1bGVcIlxuIFx0XHRcdCk7XG4gXHRcdH07XG5cbiBcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0bW9kdWxlSWQgPSB0b01vZHVsZUlkKGlkKTtcbiBcdFx0XHRcdC8qKiBAdHlwZSB7VE9ET30gKi9cbiBcdFx0XHRcdHZhciByZXN1bHQ7XG4gXHRcdFx0XHRpZiAoaG90VXBkYXRlW2lkXSkge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSBnZXRBZmZlY3RlZFN0dWZmKG1vZHVsZUlkKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcImRpc3Bvc2VkXCIsXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IGlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHQvKiogQHR5cGUge0Vycm9yfGZhbHNlfSAqL1xuIFx0XHRcdFx0dmFyIGFib3J0RXJyb3IgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0FwcGx5ID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9EaXNwb3NlID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgY2hhaW5JbmZvID0gXCJcIjtcbiBcdFx0XHRcdGlmIChyZXN1bHQuY2hhaW4pIHtcbiBcdFx0XHRcdFx0Y2hhaW5JbmZvID0gXCJcXG5VcGRhdGUgcHJvcGFnYXRpb246IFwiICsgcmVzdWx0LmNoYWluLmpvaW4oXCIgLT4gXCIpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c3dpdGNoIChyZXN1bHQudHlwZSkge1xuIFx0XHRcdFx0XHRjYXNlIFwic2VsZi1kZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIHNlbGYgZGVjbGluZTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBkZWNsaW5lZCBkZXBlbmRlbmN5OiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRcIiBpbiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0LnBhcmVudElkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJ1bmFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25VbmFjY2VwdGVkKSBvcHRpb25zLm9uVW5hY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVVbmFjY2VwdGVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2UgXCIgKyBtb2R1bGVJZCArIFwiIGlzIG5vdCBhY2NlcHRlZFwiICsgY2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkFjY2VwdGVkKSBvcHRpb25zLm9uQWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0FwcGx5ID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRpc3Bvc2VkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EaXNwb3NlZCkgb3B0aW9ucy5vbkRpc3Bvc2VkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9EaXNwb3NlID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0ZGVmYXVsdDpcbiBcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJVbmV4Y2VwdGlvbiB0eXBlIFwiICsgcmVzdWx0LnR5cGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGFib3J0RXJyb3IpIHtcbiBcdFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiYWJvcnRcIik7XG4gXHRcdFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChhYm9ydEVycm9yKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0FwcGx5KSB7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gaG90VXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCByZXN1bHQub3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0XHRcdFx0Zm9yIChtb2R1bGVJZCBpbiByZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRcdFx0XHRpZiAoXG4gXHRcdFx0XHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcyxcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdFx0XHRcdClcbiBcdFx0XHRcdFx0XHQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKVxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KFxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0sXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF1cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9EaXNwb3NlKSB7XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgW3Jlc3VsdC5tb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IHdhcm5VbmV4cGVjdGVkUmVxdWlyZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBTdG9yZSBzZWxmIGFjY2VwdGVkIG91dGRhdGVkIG1vZHVsZXMgdG8gcmVxdWlyZSB0aGVtIGxhdGVyIGJ5IHRoZSBtb2R1bGUgc3lzdGVtXG4gXHRcdHZhciBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdG1vZHVsZUlkID0gb3V0ZGF0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdICYmXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZCAmJlxuIFx0XHRcdFx0Ly8gcmVtb3ZlZCBzZWxmLWFjY2VwdGVkIG1vZHVsZXMgc2hvdWxkIG5vdCBiZSByZXF1aXJlZFxuIFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gIT09IHdhcm5VbmV4cGVjdGVkUmVxdWlyZVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0b3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLnB1c2goe1xuIFx0XHRcdFx0XHRtb2R1bGU6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRlcnJvckhhbmRsZXI6IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXG4gXHRcdFx0XHR9KTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBOb3cgaW4gXCJkaXNwb3NlXCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiZGlzcG9zZVwiKTtcbiBcdFx0T2JqZWN0LmtleXMoaG90QXZhaWxhYmxlRmlsZXNNYXApLmZvckVhY2goZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSA9PT0gZmFsc2UpIHtcbiBcdFx0XHRcdGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdH0pO1xuXG4gXHRcdHZhciBpZHg7XG4gXHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpO1xuIFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdG1vZHVsZUlkID0gcXVldWUucG9wKCk7XG4gXHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0aWYgKCFtb2R1bGUpIGNvbnRpbnVlO1xuXG4gXHRcdFx0dmFyIGRhdGEgPSB7fTtcblxuIFx0XHRcdC8vIENhbGwgZGlzcG9zZSBoYW5kbGVyc1xuIFx0XHRcdHZhciBkaXNwb3NlSGFuZGxlcnMgPSBtb2R1bGUuaG90Ll9kaXNwb3NlSGFuZGxlcnM7XG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IGRpc3Bvc2VIYW5kbGVycy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0Y2IgPSBkaXNwb3NlSGFuZGxlcnNbal07XG4gXHRcdFx0XHRjYihkYXRhKTtcbiBcdFx0XHR9XG4gXHRcdFx0aG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdID0gZGF0YTtcblxuIFx0XHRcdC8vIGRpc2FibGUgbW9kdWxlICh0aGlzIGRpc2FibGVzIHJlcXVpcmVzIGZyb20gdGhpcyBtb2R1bGUpXG4gXHRcdFx0bW9kdWxlLmhvdC5hY3RpdmUgPSBmYWxzZTtcblxuIFx0XHRcdC8vIHJlbW92ZSBtb2R1bGUgZnJvbSBjYWNoZVxuIFx0XHRcdGRlbGV0ZSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHdoZW4gZGlzcG9zaW5nIHRoZXJlIGlzIG5vIG5lZWQgdG8gY2FsbCBkaXNwb3NlIGhhbmRsZXJcbiBcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIFwicGFyZW50c1wiIHJlZmVyZW5jZXMgZnJvbSBhbGwgY2hpbGRyZW5cbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlLmNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgY2hpbGQgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZS5jaGlsZHJlbltqXV07XG4gXHRcdFx0XHRpZiAoIWNoaWxkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlkeCA9IGNoaWxkLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIHtcbiBcdFx0XHRcdFx0Y2hpbGQucGFyZW50cy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyByZW1vdmUgb3V0ZGF0ZWQgZGVwZW5kZW5jeSBmcm9tIG1vZHVsZSBjaGlsZHJlblxuIFx0XHR2YXIgZGVwZW5kZW5jeTtcbiBcdFx0dmFyIG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2pdO1xuIFx0XHRcdFx0XHRcdGlkeCA9IG1vZHVsZS5jaGlsZHJlbi5pbmRleE9mKGRlcGVuZGVuY3kpO1xuIFx0XHRcdFx0XHRcdGlmIChpZHggPj0gMCkgbW9kdWxlLmNoaWxkcmVuLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTm93IGluIFwiYXBwbHlcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJhcHBseVwiKTtcblxuIFx0XHRob3RDdXJyZW50SGFzaCA9IGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdFx0Ly8gaW5zZXJ0IG5ldyBjb2RlXG4gXHRcdGZvciAobW9kdWxlSWQgaW4gYXBwbGllZFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXBwbGllZFVwZGF0ZSwgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGNhbGwgYWNjZXB0IGhhbmRsZXJzXG4gXHRcdHZhciBlcnJvciA9IG51bGw7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHR2YXIgY2FsbGJhY2tzID0gW107XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXTtcbiBcdFx0XHRcdFx0XHRjYiA9IG1vZHVsZS5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcGVuZGVuY3ldO1xuIFx0XHRcdFx0XHRcdGlmIChjYikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKGNhbGxiYWNrcy5pbmRleE9mKGNiKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2tzLnB1c2goY2IpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0Y2IgPSBjYWxsYmFja3NbaV07XG4gXHRcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRcdGNiKG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzKTtcbiBcdFx0XHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJhY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0XHRkZXBlbmRlbmN5SWQ6IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBMb2FkIHNlbGYgYWNjZXB0ZWQgbW9kdWxlc1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGl0ZW0gPSBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXNbaV07XG4gXHRcdFx0bW9kdWxlSWQgPSBpdGVtLm1vZHVsZTtcbiBcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0aWYgKHR5cGVvZiBpdGVtLmVycm9ySGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0aXRlbS5lcnJvckhhbmRsZXIoZXJyKTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZXJyMikge1xuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yLWhhbmRsZXItZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnIyLFxuIFx0XHRcdFx0XHRcdFx0XHRvcmlnaW5hbEVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnIyO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGhhbmRsZSBlcnJvcnMgaW4gYWNjZXB0IGhhbmRsZXJzIGFuZCBzZWxmIGFjY2VwdGVkIG1vZHVsZSBsb2FkXG4gXHRcdGlmIChlcnJvcikge1xuIFx0XHRcdGhvdFNldFN0YXR1cyhcImZhaWxcIik7XG4gXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiBcdFx0fVxuXG4gXHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gXHRcdFx0cmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aG90OiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpLFxuIFx0XHRcdHBhcmVudHM6IChob3RDdXJyZW50UGFyZW50c1RlbXAgPSBob3RDdXJyZW50UGFyZW50cywgaG90Q3VycmVudFBhcmVudHMgPSBbXSwgaG90Q3VycmVudFBhcmVudHNUZW1wKSxcbiBcdFx0XHRjaGlsZHJlbjogW11cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkpO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIF9fd2VicGFja19oYXNoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gaG90Q3VycmVudEhhc2g7IH07XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gaG90Q3JlYXRlUmVxdWlyZSgwKShfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsIi8vIEltcG9ydHNcbnZhciBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiKTtcbmV4cG9ydHMgPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oZmFsc2UpO1xuLy8gTW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIubmF2aWdhdGlvbiB7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBwb3NpdGlvbjogJ2ZpeGVkJztcXG4gIGxlZnQ6IDA7XFxufVxcbi5uYXZpZ2F0aW9uIC5wcmltYXJ5IHtcXG4gIHBhZGRpbmc6IDAuNXB4IDA7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB3aWR0aDogMTAwJTtcXG59XFxuLm5hdmlnYXRpb24gLnByaW1hcnkgLnNlbGVjdGVkIHtcXG4gIGJvcmRlci1sZWZ0OiA1cHggc29saWQgd2hpdGU7XFxufVxcbi5uYXZpZ2F0aW9uIC5zZWNvbmRhcnkge1xcbiAgcGFkZGluZzogMC41cmVtIDFyZW07XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB3aWR0aDogMTAwJTtcXG59XFxuLm5hdmlnYXRpb24gLnNlY29uZGFyeSAuaG92ZXJlZDpob3ZlciB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBiYWNrZ3JvdW5kOiAjMmY0NTY2ICFpbXBvcnRhbnQ7XFxufVxcblwiLCBcIlwiXSk7XG4vLyBFeHBvcnRzXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHM7XG4iLCIvLyBJbXBvcnRzXG52YXIgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIik7XG5leHBvcnRzID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKGZhbHNlKTtcbi8vIE1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLnBhZ2VXcmFwcGVyIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgcGFkZGluZzogMDtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxufVxcbi5wYWdlV3JhcHBlciAubWFpbldyYXBwZXIge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgcGFkZGluZzogMDtcXG4gIGJhY2tncm91bmQ6ICNmZmY7XFxufVxcbi5wYWdlV3JhcHBlciAubWFpbldyYXBwZXIgLm1haW5NZW51IHtcXG4gIHotaW5kZXg6IDE7XFxufVxcbi5wYWdlV3JhcHBlciAubWFpbldyYXBwZXIgLm1haW5NZW51IC5uYXZpZ2F0aW9uIHtcXG4gIGhlaWdodDogMTAwdmg7XFxuICB3aWR0aDogMTAwJTtcXG4gIHBvc2l0aW9uOiAnZml4ZWQnO1xcbiAgbGVmdDogMDtcXG59XFxuLnBhZ2VXcmFwcGVyIC5tYWluV3JhcHBlciAubWFpbk1lbnUgLm5hdmlnYXRpb24gLm1lbnUge1xcbiAgaGVpZ2h0OiAxMDAlO1xcbn1cXG4ucm91dGVzIHtcXG4gIGhlaWdodDogMTAwdmg7XFxuICB3aWR0aDogMTAwJTtcXG4gIHBvc2l0aW9uOiAnZml4ZWQnO1xcbiAgbGVmdDogMDtcXG59XFxuXCIsIFwiXCJdKTtcbi8vIEV4cG9ydHNcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cztcbiIsIi8vIEltcG9ydHNcbnZhciBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiKTtcbmV4cG9ydHMgPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oZmFsc2UpO1xuLy8gTW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIubG9hZGluZyB7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbn1cXG4ubG9hZGluZyAucGFnZSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHBvc2l0aW9uOiBpbmhlcml0ICFpbXBvcnRhbnQ7XFxufVxcblwiLCBcIlwiXSk7XG4vLyBFeHBvcnRzXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHM7XG4iLCIvLyBJbXBvcnRzXG52YXIgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIik7XG5leHBvcnRzID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKGZhbHNlKTtcbi8vIE1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLmNvbXBhbnkge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcbi51cGxvYWQge1xcbiAgd2lkdGg6IGF1dG87XFxuICBoZWlnaHQ6IGF1dG87XFxufVxcblwiLCBcIlwiXSk7XG4vLyBFeHBvcnRzXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHM7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXNlU291cmNlTWFwKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKTtcblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgcmV0dXJuIFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChjb250ZW50LCBcIn1cIik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oJycpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gKG1vZHVsZXMsIG1lZGlhUXVlcnksIGRlZHVwZSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgJyddXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItZGVzdHJ1Y3R1cmluZ1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2ldWzBdO1xuXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IG1vZHVsZXMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19pXSk7XG5cbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29udGludWVcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYVF1ZXJ5KSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMl0gPSBcIlwiLmNvbmNhdChtZWRpYVF1ZXJ5LCBcIiBhbmQgXCIpLmNvbmNhdChpdGVtWzJdKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTtcblxuZnVuY3Rpb24gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdIHx8ICcnOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLWRlc3RydWN0dXJpbmdcblxuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBpZiAodXNlU291cmNlTWFwICYmIHR5cGVvZiBidG9hID09PSAnZnVuY3Rpb24nKSB7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSB0b0NvbW1lbnQoY3NzTWFwcGluZyk7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCAnJykuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbignXFxuJyk7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oJ1xcbicpO1xufSAvLyBBZGFwdGVkIGZyb20gY29udmVydC1zb3VyY2UtbWFwIChNSVQpXG5cblxuZnVuY3Rpb24gdG9Db21tZW50KHNvdXJjZU1hcCkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSk7XG4gIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgcmV0dXJuIFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbn0iLCIvKiEgSXNvbW9ycGhpYyBTdHlsZSBMb2FkZXIgfCBNSVQgTGljZW5zZSB8IGh0dHBzOi8vZ2l0aHViLmNvbS9rcmlhc29mdC9pc29tb3JwaGljLXN0eWxlLWxvYWRlciAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBpbnNlcnRlZCA9IHt9O1xuXG5mdW5jdGlvbiBiNjRFbmNvZGVVbmljb2RlKHN0cikge1xuICByZXR1cm4gYnRvYShlbmNvZGVVUklDb21wb25lbnQoc3RyKS5yZXBsYWNlKC8lKFswLTlBLUZdezJ9KS9nLCBmdW5jdGlvbiAobWF0Y2gsIHAxKSB7XG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoXCIweFwiICsgcDEpO1xuICB9KSk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUNzcyhpZHMpIHtcbiAgaWRzLmZvckVhY2goZnVuY3Rpb24gKGlkKSB7XG4gICAgaWYgKC0taW5zZXJ0ZWRbaWRdIDw9IDApIHtcbiAgICAgIHZhciBlbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuXG4gICAgICBpZiAoZWxlbSkge1xuICAgICAgICBlbGVtLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWxlbSk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gaW5zZXJ0Q3NzKHN0eWxlcywgX3RlbXApIHtcbiAgdmFyIF9yZWYgPSBfdGVtcCA9PT0gdm9pZCAwID8ge30gOiBfdGVtcCxcbiAgICAgIF9yZWYkcmVwbGFjZSA9IF9yZWYucmVwbGFjZSxcbiAgICAgIHJlcGxhY2UgPSBfcmVmJHJlcGxhY2UgPT09IHZvaWQgMCA/IGZhbHNlIDogX3JlZiRyZXBsYWNlLFxuICAgICAgX3JlZiRwcmVwZW5kID0gX3JlZi5wcmVwZW5kLFxuICAgICAgcHJlcGVuZCA9IF9yZWYkcHJlcGVuZCA9PT0gdm9pZCAwID8gZmFsc2UgOiBfcmVmJHByZXBlbmQsXG4gICAgICBfcmVmJHByZWZpeCA9IF9yZWYucHJlZml4LFxuICAgICAgcHJlZml4ID0gX3JlZiRwcmVmaXggPT09IHZvaWQgMCA/ICdzJyA6IF9yZWYkcHJlZml4O1xuXG4gIHZhciBpZHMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBfc3R5bGVzJGkgPSBzdHlsZXNbaV0sXG4gICAgICAgIG1vZHVsZUlkID0gX3N0eWxlcyRpWzBdLFxuICAgICAgICBjc3MgPSBfc3R5bGVzJGlbMV0sXG4gICAgICAgIG1lZGlhID0gX3N0eWxlcyRpWzJdLFxuICAgICAgICBzb3VyY2VNYXAgPSBfc3R5bGVzJGlbM107XG4gICAgdmFyIGlkID0gXCJcIiArIHByZWZpeCArIG1vZHVsZUlkICsgXCItXCIgKyBpO1xuICAgIGlkcy5wdXNoKGlkKTtcblxuICAgIGlmIChpbnNlcnRlZFtpZF0pIHtcbiAgICAgIGlmICghcmVwbGFjZSkge1xuICAgICAgICBpbnNlcnRlZFtpZF0rKztcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaW5zZXJ0ZWRbaWRdID0gMTtcbiAgICB2YXIgZWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcbiAgICB2YXIgY3JlYXRlID0gZmFsc2U7XG5cbiAgICBpZiAoIWVsZW0pIHtcbiAgICAgIGNyZWF0ZSA9IHRydWU7XG4gICAgICBlbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICAgIGVsZW0uc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQvY3NzJyk7XG4gICAgICBlbGVtLmlkID0gaWQ7XG5cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBlbGVtLnNldEF0dHJpYnV0ZSgnbWVkaWEnLCBtZWRpYSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGNzc1RleHQgPSBjc3M7XG5cbiAgICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjc3NUZXh0ICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIiArIGI2NEVuY29kZVVuaWNvZGUoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkgKyBcIiovXCI7XG4gICAgICBjc3NUZXh0ICs9IFwiXFxuLyojIHNvdXJjZVVSTD1cIiArIHNvdXJjZU1hcC5maWxlICsgXCI/XCIgKyBpZCArIFwiKi9cIjtcbiAgICB9XG5cbiAgICBpZiAoJ3RleHRDb250ZW50JyBpbiBlbGVtKSB7XG4gICAgICBlbGVtLnRleHRDb250ZW50ID0gY3NzVGV4dDtcbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3NUZXh0O1xuICAgIH1cblxuICAgIGlmIChjcmVhdGUpIHtcbiAgICAgIGlmIChwcmVwZW5kKSB7XG4gICAgICAgIGRvY3VtZW50LmhlYWQuaW5zZXJ0QmVmb3JlKGVsZW0sIGRvY3VtZW50LmhlYWQuY2hpbGROb2Rlc1swXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGVsZW0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZW1vdmVDc3MuYmluZChudWxsLCBpZHMpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydENzcztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluc2VydENzcy5qcy5tYXBcbiIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuaW1wb3J0ICdkb3RlbnYvY29uZmlnJztcbmltcG9ydCBBcHAsIHsgYXBwbGljYXRpb24gfSBmcm9tICcuL3NyYy9hcHAnO1xuaW1wb3J0IHsgY3JlYXRlU2VydmVyIH0gZnJvbSAnaHR0cCc7XG5pbXBvcnQgeyBub3JtYWxpemVQb3J0IH0gZnJvbSAnLi9zcmMvdXRpbC9ub3JtYWxpemUnO1xuY2xhc3MgT29Kb2Ige1xuICAgIGNvbnN0cnVjdG9yKGFwcCkge1xuICAgICAgICB0aGlzLnN0YXJ0U3luY1NlcnZlciA9IChwb3J0KSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uLmFwcGx5TWlkZGxld2FyZSgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IFBPUlQgPSBub3JtYWxpemVQb3J0KHBvcnQpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2VydmVyLmxpc3RlbihQT1JULCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhgcnVubmluZyBvbiBwb3J0OiBodHRwOi8vbG9jYWxob3N0OiR7cG9ydH1gKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IobmV3IEVycm9yKCdFcnJvciBTdGFydGluZyBPb0pvYiBTZXJ2ZXIgLi4uJykpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgICAgIHlpZWxkIHRoaXMuc3RvcFNlcnZlcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdG9wU2VydmVyID0gKCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgcHJvY2Vzcy5vbignU0lHSU5UJywgKCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignQ2xvc2luZyBPb0pvYiBTZXJ2ZXIgLi4uJyk7XG4gICAgICAgICAgICAgICAgeWllbGQgYXBwbGljYXRpb24uY2xvc2VTZXJ2ZXIoKTtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlcnZlci5jbG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ09vSm9iIFNlcnZlciBDbG9zZWQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIENsb3NpbmcgT29Kb2JTZXJ2ZXIgU2VydmVyIENvbm5lY3Rpb24nKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIHByb2Nlc3Mua2lsbChwcm9jZXNzLnBpZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5hcHAgPSBhcHA7XG4gICAgICAgIHRoaXMuc2VydmVyID0gY3JlYXRlU2VydmVyKGFwcCk7XG4gICAgICAgIGNvbnNvbGUuaW5mbygnSW5pdGlhbGl6ZWQgT29Kb2JTZXJ2ZXInKTtcbiAgICB9XG59XG5jb25zdCB7IHN0YXJ0U3luY1NlcnZlciwgc3RvcFNlcnZlciB9ID0gbmV3IE9vSm9iKEFwcCk7XG5jb25zdCBzdGFydCA9ICgpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIGNvbnN0IHsgUE9SVCB9ID0gcHJvY2Vzcy5lbnY7XG4gICAgY29uc3QgcG9ydCA9IFBPUlQgfHwgJzgwODAnO1xuICAgIHRyeSB7XG4gICAgICAgIHlpZWxkIHN0b3BTZXJ2ZXIoKTtcbiAgICAgICAgeWllbGQgc3RhcnRTeW5jU2VydmVyKHBvcnQpO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignU2VydmVyIEZhaWxlZCB0byBzdGFydCcpO1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgcHJvY2Vzcy5leGl0KDEpO1xuICAgIH1cbn0pO1xuc3RhcnQoKTtcbiIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgeyBiYXNlQ29udHJvbGxlciB9IGZyb20gJy4vY29udHJvbGxlcic7XG5pbXBvcnQgbWlkZGxld2FyZXMgZnJvbSAnLi9taWRkbGV3YXJlJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuY29uc3QgQlVJTERfUEFUSCA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdidWlsZCcpO1xuY2xhc3MgQXBwIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5jbG9zZVNlcnZlciA9ICgpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjbG9zZSBzZXJ2ZXInKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuYXBwbHlNaWRkbGV3YXJlID0gKCkgPT4ge1xuICAgICAgICAgICAgbWlkZGxld2FyZXModGhpcy5hcHApO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmFwcCA9IGV4cHJlc3MoKTtcbiAgICAgICAgdGhpcy5hcHAudXNlKGV4cHJlc3Muc3RhdGljKEJVSUxEX1BBVEgsIHt9KSk7XG4gICAgICAgIHRoaXMuYXBwLnVzZShiYXNlQ29udHJvbGxlcik7XG4gICAgICAgIGNvbnNvbGUuaW5mbygnSW5pdGlhbGl6ZWQgQXBwJyk7XG4gICAgfVxuICAgIHN0YXRpYyBib290c3RyYXAoKSB7XG4gICAgICAgIHJldHVybiBuZXcgQXBwKCk7XG4gICAgfVxufVxuZXhwb3J0IGNvbnN0IGFwcGxpY2F0aW9uID0gbmV3IEFwcCgpO1xuZXhwb3J0IGRlZmF1bHQgYXBwbGljYXRpb24uYXBwO1xuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5pbXBvcnQgeyBBcG9sbG9DbGllbnQsIEh0dHBMaW5rLCBJbk1lbW9yeUNhY2hlIH0gZnJvbSAnQGFwb2xsby9jbGllbnQnO1xuaW1wb3J0IHsgQXBvbGxvUHJvdmlkZXIgfSBmcm9tICdAYXBvbGxvL2NsaWVudCc7XG5pbXBvcnQgQXBwIGZyb20gJy4uLy4uL3NyYy9hcHAnO1xuLy8gaW1wb3J0IHsgSGVsbWV0IH0gZnJvbSAncmVhY3QtaGVsbWV0J1xuaW1wb3J0IEh0bWwgZnJvbSAnLi91dGlsL2h0bWwnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFN0YXRpY1JvdXRlciBhcyBSb3V0ZXIgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmltcG9ydCBhc3NldHMgZnJvbSAnLi91dGlsL2Fzc2V0cyc7XG5pbXBvcnQgZmV0Y2ggZnJvbSAnbm9kZS1mZXRjaCc7XG5pbXBvcnQgeyBnZXREYXRhRnJvbVRyZWUgfSBmcm9tIFwiQGFwb2xsby9yZWFjdC1zc3JcIjtcbmltcG9ydCB7IHJlbmRlclRvU3RhdGljTWFya3VwIH0gZnJvbSAncmVhY3QtZG9tL3NlcnZlcic7XG5leHBvcnQgY29uc3QgYmFzZUNvbnRyb2xsZXIgPSAocmVxLCByZXMpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIGNvbnN0IHsgUkVBQ1RfQVBQX0dBVEVXQVlfQVBJIH0gPSBwcm9jZXNzLmVudjtcbiAgICBjb25zdCBjbGllbnQgPSBuZXcgQXBvbGxvQ2xpZW50KHtcbiAgICAgICAgc3NyTW9kZTogdHJ1ZSxcbiAgICAgICAgY2FjaGU6IG5ldyBJbk1lbW9yeUNhY2hlKCksXG4gICAgICAgIGxpbms6IG5ldyBIdHRwTGluayh7XG4gICAgICAgICAgICB1cmk6IFJFQUNUX0FQUF9HQVRFV0FZX0FQSSxcbiAgICAgICAgICAgIGZldGNoXG4gICAgICAgIH0pXG4gICAgfSk7XG4gICAgY29uc3QgYXBwID0gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQXBvbGxvUHJvdmlkZXIsIHsgY2xpZW50OiBjbGllbnQgfSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChSb3V0ZXIsIHsgbG9jYXRpb246IHJlcS51cmwsIGNvbnRleHQ6IHt9IH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEFwcCwgbnVsbCkpKSk7XG4gICAgeWllbGQgZ2V0RGF0YUZyb21UcmVlKGFwcCk7XG4gICAgY29uc3QgY29udGVudCA9IHJlbmRlclRvU3RhdGljTWFya3VwKGFwcCk7XG4gICAgY29uc3QgaW5pdGlhbFN0YXRlID0gY2xpZW50LmV4dHJhY3QoKTtcbiAgICAvLyBjb25zdCBoZWxtZXQgPSBIZWxtZXQucmVuZGVyU3RhdGljKClcbiAgICBjb25zdCBkYXRhID0geyBjb250ZW50LCBpbml0aWFsU3RhdGUsIGhlbG1ldDoge30sIGFzc2V0cyB9O1xuICAgIGNvbnN0IGh0bWwgPSByZW5kZXJUb1N0YXRpY01hcmt1cChSZWFjdC5jcmVhdGVFbGVtZW50KEh0bWwsIE9iamVjdC5hc3NpZ24oe30sIGRhdGEpKSk7XG4gICAgcmVzLnN0YXR1cygyMDApO1xuICAgIHJlcy5zZW5kKGA8IWRvY3R5cGUgaHRtbD4ke2h0bWx9YCk7XG4gICAgcmVzLmVuZCgpO1xufSk7XG4iLCJpbXBvcnQgYm9keVBhcnNlciBmcm9tICdib2R5LXBhcnNlcic7XG5pbXBvcnQgY29tcHJlc3Npb24gZnJvbSAnY29tcHJlc3Npb24nO1xuaW1wb3J0IGhlbG1ldCBmcm9tICdoZWxtZXQnO1xuaW1wb3J0IGhwcCBmcm9tICdocHAnO1xuY29uc3QgbWlkZGxld2FyZXMgPSAoYXBwKSA9PiB7XG4gICAgLy8ganNvbiBlbmNvZGluZyBhbmQgZGVjb2RpbmdcbiAgICBhcHAudXNlKGJvZHlQYXJzZXIudXJsZW5jb2RlZCh7IGV4dGVuZGVkOiBmYWxzZSB9KSk7XG4gICAgYXBwLnVzZShib2R5UGFyc2VyLmpzb24oKSk7XG4gICAgLy8gc2V0IHRydXN0ZWQgaXBcbiAgICBhcHAuc2V0KCd0cnVzdCBwcm94eScsIHRydWUpO1xuICAgIC8vIGRvIG5vdCBzaG93IHBvd2VyZWQgYnkgZXhwcmVzc1xuICAgIGFwcC5zZXQoJ3gtcG93ZXJlZC1ieScsIGZhbHNlKTtcbiAgICAvLyBzZXQgR1ppcCBvbiBoZWFkZXJzIGZvciByZXF1ZXN0L3Jlc3BvbnNlXG4gICAgYXBwLnVzZShjb21wcmVzc2lvbigpKTtcbiAgICAvLyBzZWN1cml0eSBoZWxtZXQgcGFja2FnZVxuICAgIC8vIERvbid0IGV4cG9zZSBhbnkgc29mdHdhcmUgaW5mb3JtYXRpb24gdG8gaGFja2Vycy5cbiAgICBhcHAuZGlzYWJsZSgneC1wb3dlcmVkLWJ5Jyk7XG4gICAgLy8gRXhwcmVzcyBtaWRkbGV3YXJlIHRvIHByb3RlY3QgYWdhaW5zdCBIVFRQIFBhcmFtZXRlciBQb2xsdXRpb24gYXR0YWNrc1xuICAgIGFwcC51c2UoaHBwKCkpO1xuICAgIC8vIFRoZSBYLUZyYW1lLU9wdGlvbnMgaGVhZGVyIHRlbGxzIGJyb3dzZXJzIHRvIHByZXZlbnQgeW91ciB3ZWJwYWdlIGZyb20gYmVpbmcgcHV0IGluIGFuIGlmcmFtZS5cbiAgICBhcHAudXNlKGhlbG1ldC5mcmFtZWd1YXJkKHsgYWN0aW9uOiAnc2FtZW9yaWdpbicgfSkpO1xuICAgIC8vIENyb3NzLXNpdGUgc2NyaXB0aW5nLCBhYmJyZXZpYXRlZCB0byDigJxYU1PigJ0sIGlzIGEgd2F5IGF0dGFja2VycyBjYW4gdGFrZSBvdmVyIHdlYnBhZ2VzLlxuICAgIGFwcC51c2UoaGVsbWV0Lnhzc0ZpbHRlcigpKTtcbiAgICAvLyBTZXRzIHRoZSBYLURvd25sb2FkLU9wdGlvbnMgdG8gcHJldmVudCBJbnRlcm5ldCBFeHBsb3JlciBmcm9tIGV4ZWN1dGluZ1xuICAgIC8vIGRvd25sb2FkcyBpbiB5b3VyIHNpdGXigJlzIGNvbnRleHQuXG4gICAgLy8gQHNlZSBodHRwczovL2hlbG1ldGpzLmdpdGh1Yi5pby9kb2NzL2llbm9vcGVuL1xuICAgIGFwcC51c2UoaGVsbWV0LmllTm9PcGVuKCkpO1xuICAgIC8vIERvbuKAmXQgU25pZmYgTWltZXR5cGUgbWlkZGxld2FyZSwgbm9TbmlmZiwgaGVscHMgcHJldmVudCBicm93c2VycyBmcm9tIHRyeWluZ1xuICAgIC8vIHRvIGd1ZXNzICjigJxzbmlmZuKAnSkgdGhlIE1JTUUgdHlwZSwgd2hpY2ggY2FuIGhhdmUgc2VjdXJpdHkgaW1wbGljYXRpb25zLiBJdFxuICAgIC8vIGRvZXMgdGhpcyBieSBzZXR0aW5nIHRoZSBYLUNvbnRlbnQtVHlwZS1PcHRpb25zIGhlYWRlciB0byBub3NuaWZmLlxuICAgIC8vIEBzZWUgaHR0cHM6Ly9oZWxtZXRqcy5naXRodWIuaW8vZG9jcy9kb250LXNuaWZmLW1pbWV0eXBlL1xuICAgIGFwcC51c2UoaGVsbWV0Lm5vU25pZmYoKSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgbWlkZGxld2FyZXM7XG4iLCJpbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5jb25zdCBCVUlMRF9QQVRIID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uL2J1aWxkJyk7XG5jb25zdCBpbmRleEh0bWwgPSBmcy5yZWFkRmlsZVN5bmMoYCR7QlVJTERfUEFUSH0vaW5kZXguaHRtbGAsIHtcbiAgICBlbmNvZGluZzogJ3V0Zi04J1xufSk7XG5jb25zdCBleHRyYWN0ID0gKHBhdHRlcm4sIHN0cmluZykgPT4ge1xuICAgIGNvbnN0IG1hdGNoZXMgPSBbXTtcbiAgICBjb25zdCByZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgJ2cnKTtcbiAgICBsZXQgbWF0Y2ggPSByZS5leGVjKHN0cmluZyk7XG4gICAgd2hpbGUgKG1hdGNoICE9PSBudWxsKSB7XG4gICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgbWF0Y2hlcy5wdXNoKG1hdGNoWzFdKTtcbiAgICAgICAgfVxuICAgICAgICBtYXRjaCA9IHJlLmV4ZWMoc3RyaW5nKTtcbiAgICB9XG4gICAgcmV0dXJuIG1hdGNoZXM7XG59O1xuZXhwb3J0IGRlZmF1bHQge1xuICAgIGNzczogZXh0cmFjdCgnPGxpbmsgaHJlZj1cIiguKz8pXCIgcmVsPVwic3R5bGVzaGVldFwiPicsIGluZGV4SHRtbCksXG4gICAganM6IGV4dHJhY3QoJzxzY3JpcHQgdHlwZT1cInRleHQvamF2YXNjcmlwdFwiIHNyYz1cIiguKz8pXCI+PC9zY3JpcHQ+JywgaW5kZXhIdG1sKVxufTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5jb25zdCBIdG1sID0gKHsgY29udGVudCwgaGVsbWV0LCBhc3NldHMsIGluaXRpYWxTdGF0ZSB9KSA9PiB7XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiaHRtbFwiLCB7IGxhbmc6IFwiZW5cIiB9LFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaGVhZFwiLCBudWxsLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm1ldGFcIiwgeyBjaGFyU2V0OiBcInV0Zi04XCIgfSksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibWV0YVwiLCB7IG5hbWU6IFwidmlld3BvcnRcIiwgY29udGVudDogXCJ3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGU9MSwgc2hyaW5rLXRvLWZpdD1ub1wiIH0pLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm1ldGFcIiwgeyBuYW1lOiBcInRoZW1lLWNvbG9yXCIsIGNvbnRlbnQ6IFwiIzAwMDAwMFwiIH0pLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpbmtcIiwgeyByZWw6IFwibWFuaWZlc3RcIiwgaHJlZjogXCIvbWFuaWZlc3QuanNvblwiIH0pLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpbmtcIiwgeyByZWw6IFwic2hvcnRjdXQgaWNvblwiLCBocmVmOiBcIi9mYXZpY29uLmljb1wiIH0pLFxuICAgICAgICAgICAgYXNzZXRzLmNzcyAmJiBhc3NldHMuY3NzLm1hcCgoYywgaWR4KSA9PiBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlua1wiLCB7IGtleTogaWR4LCBocmVmOiBjLCByZWw6IFwic3R5bGVzaGVldFwiIH0pKSksXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJib2R5XCIsIG51bGwsXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibm9zY3JpcHRcIiwgbnVsbCwgXCJZb3UgbmVlZCB0byBlbmFibGUgSmF2YVNjcmlwdCB0byBydW4gdGhpcyBhcHAuXCIpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGlkOiBcInJvb3RcIiwgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw6IHsgX19odG1sOiBjb250ZW50IH0gfSksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIsIHsgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw6IHtcbiAgICAgICAgICAgICAgICAgICAgX19odG1sOiBgd2luZG93Ll9fQVBPTExPX1NUQVRFX189JHtKU09OLnN0cmluZ2lmeShpbml0aWFsU3RhdGUpLnJlcGxhY2UoLzwvZywgJ1xcXFx1MDAzYycpfWBcbiAgICAgICAgICAgICAgICB9IH0pLFxuICAgICAgICAgICAgYXNzZXRzLmpzICYmIGFzc2V0cy5qcy5tYXAoKGosIGlkeCkgPT4gUmVhY3QuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiLCB7IGtleTogaWR4LCBzcmM6IGogfSkpKSkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IEh0bWw7XG4iLCJjb25zdCBub3JtYWxpemVQb3J0ID0gKHBvcnRWYWx1ZSkgPT4ge1xuICAgIGNvbnN0IHBvcnQgPSBwYXJzZUludChwb3J0VmFsdWUsIDEwKTtcbiAgICBpZiAoaXNOYU4ocG9ydCkpIHtcbiAgICAgICAgcmV0dXJuIDgwODA7XG4gICAgfVxuICAgIGlmIChwb3J0ID49IDApIHtcbiAgICAgICAgcmV0dXJuIHBvcnQ7XG4gICAgfVxuICAgIHJldHVybiBwb3J0O1xufTtcbmV4cG9ydCB7IG5vcm1hbGl6ZVBvcnQgfTtcbiIsImltcG9ydCB7IExheW91dCB9IGZyb20gJ2FudGQnO1xuaW1wb3J0IExvYWRpbmcgZnJvbSAnY29tcG9uZW50cy9sb2FkaW5nJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBTZWNvbmRhcnlSb3V0ZXMgfSBmcm9tICdhcHAvcm91dGVzJztcbmNvbnN0IHsgQ29udGVudCB9ID0gTGF5b3V0O1xuLyoqXG4gKiBBcHBCb2R5XG4gKi9cbmNvbnN0IEFwcEJvZHkgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBpc0xvYWRpbmcgfSA9IHsgaXNMb2FkaW5nOiBmYWxzZSB9O1xuICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChMYXlvdXQsIHsgaGFzU2lkZXI6IGZhbHNlIH0sXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ29udGVudCwgbnVsbCxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTG9hZGluZywgeyBsb2FkaW5nOiBCb29sZWFuKGlzTG9hZGluZyksIG1lc3NhZ2U6IFwibG9hZGluZyAuLi5cIiB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2Vjb25kYXJ5Um91dGVzLCBudWxsKSkpKSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgQXBwQm9keTtcbiIsImltcG9ydCB7IENvbCwgTGF5b3V0LCBSb3cgfSBmcm9tICdhbnRkJztcbmltcG9ydCBOYXZpZ2F0aW9uLCB7IFByaW1hcnkgfSBmcm9tICdhcHAvbmF2aWdhdGlvbic7XG5pbXBvcnQgTG9hZGluZyBmcm9tICdjb21wb25lbnRzL2xvYWRpbmcnO1xuaW1wb3J0IHsgUHJpbWFyeVJvdXRlcyB9IGZyb20gJ2FwcC9yb3V0ZXMnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBzdHlsZXMgZnJvbSAnYXBwL3N0eWxlLm1vZHVsZS5sZXNzJztcbmNvbnN0IHsgU2lkZXIgfSA9IExheW91dDtcbi8qKlxuICogQXV0aGVudGljYXRlZEFwcE5hdmlnYXRpb25cbiAqL1xuY29uc3QgQXV0aGVudGljYXRlZEFwcE5hdmlnYXRpb24gPSAoKSA9PiB7XG4gICAgY29uc3QgeyB1c2VyIH0gPSB7XG4gICAgICAgIHVzZXI6IHsgcGljdHVyZTogXCJodHRwOi8vZHVtbXkuZHVja1wiLCBlbWFpbDogXCJkb2RvQGR1Y2tcIiwgbmFtZTogXCJkdW1teSB1c2VyXCIgfSxcbiAgICB9O1xuICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChTaWRlciwgeyB3aWR0aDogXCIxMDAlXCIsIGNsYXNzTmFtZTogc3R5bGVzLm5hdmlnYXRpb24sIGNvbGxhcHNlZFdpZHRoOiBcIjBcIiwgYnJlYWtwb2ludDogXCJsZ1wiIH0sXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUm93LCBudWxsLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChOYXZpZ2F0aW9uLCBudWxsLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ29sLCB7IHNwYW46IDYsIGNsYXNzTmFtZTogc3R5bGVzLm1lbnUgfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChQcmltYXJ5LCB7IHVzZXI6IHVzZXIsIGlzQXV0aGVudGljYXRlZDogZmFsc2UgfSksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgXCJkb2RvIGR1Y2tcIikpLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ29sLCB7IHNwYW46IDE4IH0sXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUHJpbWFyeVJvdXRlcywgbnVsbCkpKSkpKTtcbn07XG4vKipcbiAqIFVuYXV0aGVudGljYXRlZEFwcE5hdmlnYXRpb25cbiAqIEBwYXJhbSBwYXJhbTBcbiAqL1xuY29uc3QgVW5hdXRoZW50aWNhdGVkQXBwTmF2aWdhdGlvbiA9ICh7IGxvYWRpbmcgfSkgPT4gUmVhY3QuY3JlYXRlRWxlbWVudChTaWRlciwgeyB3aWR0aDogXCIxMDAlXCIsIGNsYXNzTmFtZTogc3R5bGVzLm5hdmlnYXRpb24sIGNvbGxhcHNlZFdpZHRoOiBcIjBcIiwgYnJlYWtwb2ludDogXCJsZ1wiIH0sXG4gICAgUmVhY3QuY3JlYXRlRWxlbWVudChSb3csIG51bGwsXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTmF2aWdhdGlvbiwgbnVsbCxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ29sLCB7IHNwYW46IDYsIGNsYXNzTmFtZTogc3R5bGVzLm1lbnUgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KExvYWRpbmcsIHsgbG9hZGluZzogbG9hZGluZyB9LFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFByaW1hcnksIHsgdXNlcjogbnVsbCwgaXNBdXRoZW50aWNhdGVkOiB0cnVlIH0pKSksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KENvbCwgeyBzcGFuOiAxOCB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTG9hZGluZywgeyBsb2FkaW5nOiBsb2FkaW5nIH0sXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUHJpbWFyeVJvdXRlcywgbnVsbCkpKSkpKTtcbi8qKlxuICogQXBwTmF2aWdhdGlvblxuICovXG5jb25zdCBBcHBOYXZpZ2F0aW9uID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgaXNMb2FkaW5nIH0gPSB7IGlzTG9hZGluZzogZmFsc2UgfTtcbiAgICBpZiAoaXNMb2FkaW5nKSB7XG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFVuYXV0aGVudGljYXRlZEFwcE5hdmlnYXRpb24sIHsgbG9hZGluZzogQm9vbGVhbihpc0xvYWRpbmcpIH0pO1xuICAgIH1cbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChBdXRoZW50aWNhdGVkQXBwTmF2aWdhdGlvbiwgbnVsbCk7XG59O1xuZXhwb3J0IGRlZmF1bHQgQXBwTmF2aWdhdGlvbjtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB3aXRoUm91dGVyIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5jb25zdCBDb250ZXh0c0Jhc2UgPSAoeyBjaGlsZHJlbiB9KSA9PiB7XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFJlYWN0LkZyYWdtZW50LCBudWxsLCBjaGlsZHJlbikpO1xufTtcbmV4cG9ydCBjb25zdCBDb250ZXh0cyA9IHdpdGhSb3V0ZXIoQ29udGV4dHNCYXNlKTtcbmV4cG9ydCBkZWZhdWx0IENvbnRleHRzO1xuIiwiaW1wb3J0IHsgQnV0dG9uLCBDb2wsIEZvcm0sIElucHV0LCBSb3csIFNlbGVjdCwgVXBsb2FkIH0gZnJvbSAnYW50ZCc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJhbmdlIGZyb20gJ2NvbXBvbmVudHMvcmFuZ2UnO1xuaW1wb3J0IFNhbGFyeUlucHV0IGZyb20gJ2NvbXBvbmVudHMvU2FsYXJ5SW5wdXQnO1xuaW1wb3J0IHsgVXBsb2FkT3V0bGluZWQgfSBmcm9tICdAYW50LWRlc2lnbi9pY29ucyc7XG5jb25zdCB7IE9wdGlvbiB9ID0gU2VsZWN0O1xuY29uc3QgeyBTZWFyY2ggfSA9IElucHV0O1xuY29uc3QgSm9iRm9ybSA9ICh7IG9uU3VibWl0IH0pID0+IHtcbiAgICBjb25zdCBjaGVja1NhbGFyeSA9IChydWxlLCBzYWxhcnkpID0+IHtcbiAgICAgICAgaWYgKHNhbGFyeS52YWx1ZSA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ1ByaWNlIG11c3QgYmUgZ3JlYXRlciB0aGFuIHplcm8hJyk7XG4gICAgfTtcbiAgICBjb25zdCB2YWxpZGF0ZVJhbmdlID0gKHJ1bGUsIHZhbHVlKSA9PiB7XG4gICAgICAgIGlmICghKHZhbHVlLm1pbiA+IDApKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ01pbiB2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiB6ZXJvIScpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghKHZhbHVlLm1heCA+IDApKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ01heCB2YWx1ZXMgbXVzdCBiZSBncmVhdGVyIHRoYW4gemVybyEnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodmFsdWUubWluID49IHZhbHVlLm1heCkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCdNYXggdmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gTWluIHZhbHVlJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH07XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KEZvcm0sIHsgbmFtZTogXCJqb2JcIiwgb25GaW5pc2g6IG9uU3VibWl0LCBpbml0aWFsVmFsdWVzOiB7XG4gICAgICAgICAgICBzYWxsYXJ5X21heDoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiAwLFxuICAgICAgICAgICAgICAgIGN1cnJlbmN5OiAnSU5SJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzYWxsYXJ5OiB7XG4gICAgICAgICAgICAgICAgbWF4OiAwLFxuICAgICAgICAgICAgICAgIG1pbjogMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN0YXR1czogJ0FDVElWRScsXG4gICAgICAgICAgICB0eXBlOiAnREVGQVVMVCdcbiAgICAgICAgfSB9LFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEZvcm0uSXRlbSwgeyBuYW1lOiBcIm5hbWVcIiB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dCwgeyBwbGFjZWhvbGRlcjogXCJKb2IgTmFtZVwiIH0pKSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChGb3JtLkl0ZW0sIHsgbmFtZTogXCJkZXNjXCIgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXQuVGV4dEFyZWEsIHsgcm93czogNCwgcGxhY2Vob2xkZXI6IFwiRW50ZXIgRGVzY3JpcHRpb25cIiB9KSksXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRm9ybS5JdGVtLCB7IG5hbWU6IFwiY2F0ZWdvcnlcIiB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChTZWxlY3QsIHsgbW9kZTogXCJ0YWdzXCIsIHN0eWxlOiB7IHdpZHRoOiAnMTAwJScgfSwgcGxhY2Vob2xkZXI6IFwiRW50ZXIgQ2F0ZWdvcmllc1wiIH0sIFtdKSksXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRm9ybS5JdGVtLCB7IG5hbWU6IFwic2tpbGxzX3JlcXVpcmVkXCIgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VsZWN0LCB7IG1vZGU6IFwidGFnc1wiLCBzdHlsZTogeyB3aWR0aDogJzEwMCUnIH0sIHBsYWNlaG9sZGVyOiBcIlNraWxscyBSZXF1aXJlZFwiIH0sIFtdKSksXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUm93LCBudWxsLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChDb2wsIHsgc3BhbjogMTEgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEZvcm0uSXRlbSwgeyBuYW1lOiBcInNhbGxhcnlcIiwgbGFiZWw6IFwiU2FsYXJ5IFJhbmdlXCIsIHJ1bGVzOiBbeyB2YWxpZGF0b3I6IHZhbGlkYXRlUmFuZ2UgfV0gfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChSYW5nZSwgbnVsbCkpKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ29sLCB7IHNwYW46IDExLCBvZmZzZXQ6IDIgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEZvcm0uSXRlbSwgeyBuYW1lOiBcInR5cGVcIiwgbGFiZWw6IFwiSm9iIFR5cGVcIiwgc3R5bGU6IHsgcGFkZGluZzogJzAgMnB4JyB9IH0sXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VsZWN0LCB7IHN0eWxlOiB7IHdpZHRoOiAnMTAwJScgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChPcHRpb24sIHsgdmFsdWU6IFwiREVGQVVMVFwiIH0sIFwiRGVmYXVsdFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoT3B0aW9uLCB7IHZhbHVlOiBcIkZFQVRVUkVEXCIgfSwgXCJGZWF0dXJlZFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoT3B0aW9uLCB7IHZhbHVlOiBcIlBSRU1JVU1cIiB9LCBcIlByZW1pdW1cIikpKSkpLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFJvdywgbnVsbCxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ29sLCB7IHNwYW46IDExIH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChGb3JtLkl0ZW0sIHsgbmFtZTogXCJzYWxsYXJ5X21heFwiLCBsYWJlbDogXCJTYWxhcnlcIiwgcnVsZXM6IFt7IHZhbGlkYXRvcjogY2hlY2tTYWxhcnkgfV0gfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChTYWxhcnlJbnB1dCwgbnVsbCkpKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ29sLCB7IHNwYW46IDExLCBvZmZzZXQ6IDIgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEZvcm0uSXRlbSwgeyBuYW1lOiBcInN0YXR1c1wiLCBsYWJlbDogXCJTdGF0dXNcIiB9LFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFNlbGVjdCwgeyBzdHlsZTogeyB3aWR0aDogJzEwMCUnIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoT3B0aW9uLCB7IHZhbHVlOiBcIkFDVElWRVwiIH0sIFwiQWN0aXZlXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChPcHRpb24sIHsgdmFsdWU6IFwiSE9MRFwiIH0sIFwiSG9sZFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoT3B0aW9uLCB7IHZhbHVlOiBcIkVYUElSRURcIiB9LCBcIkV4cGlyZWRcIikpKSkpLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEZvcm0uSXRlbSwgeyBuYW1lOiBcImxvY2F0aW9uXCIgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VhcmNoLCB7IHBsYWNlaG9sZGVyOiBcImNvbXBhbnkgTG9jYXRpb24uIGV4OiBCYW5nYWxvcmVcIiwgbG9hZGluZzogdHJ1ZSB9KSksXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRm9ybS5JdGVtLCB7IG5hbWU6IFwiYXR0YWNobWVudFwiLCBsYWJlbDogXCJBdHRhY2htZW50c1wiIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFVwbG9hZCwgbnVsbCxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJ1dHRvbiwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChVcGxvYWRPdXRsaW5lZCwgbnVsbCksXG4gICAgICAgICAgICAgICAgICAgIFwiIENsaWNrIHRvIFVwbG9hZFwiKSkpLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEZvcm0uSXRlbSwgbnVsbCxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnV0dG9uLCB7IHR5cGU6IFwicHJpbWFyeVwiLCBodG1sVHlwZTogXCJzdWJtaXRcIiB9LCBcIkNyZWF0ZVwiKSkpKTtcbn07XG5leHBvcnQgZGVmYXVsdCBKb2JGb3JtO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmNvbnN0IFBheW1lbnRGb3JtID0gKCkgPT4gUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLFxuICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJoMlwiLCBudWxsLCBcInBheW1lbnQgZm9ybVwiKSxcbiAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwicFwiLCBudWxsLCBcIm9ybSBnb2VzIGhlcmVcIikpO1xuZXhwb3J0IGRlZmF1bHQgUGF5bWVudEZvcm07XG4iLCJpbXBvcnQgeyBDb2wsIExheW91dCwgUm93IH0gZnJvbSAnYW50ZCc7XG5pbXBvcnQgQXBwQm9keSBmcm9tICdhcHAvX2JvZHknO1xuaW1wb3J0IEFwcE5hdmlnYXRpb24gZnJvbSAnYXBwL19oZWFkZXInO1xuaW1wb3J0IENvbnRleHRzIGZyb20gJ2FwcC9jb250ZXh0cyc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHN0eWxlcyBmcm9tICdhcHAvc3R5bGUubW9kdWxlLmxlc3MnO1xuLyoqXG4gKiBBcHBMYXlvdXRcbiAqIEBwYXJhbSBwYXJhbTBcbiAqL1xuY29uc3QgQXBwTGF5b3V0ID0gKHsgY2hpbGRyZW4gfSkgPT4gUmVhY3QuY3JlYXRlRWxlbWVudChDb250ZXh0cywgbnVsbCxcbiAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBzdHlsZXMucGFnZVdyYXBwZXIgfSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogc3R5bGVzLm1haW5XcmFwcGVyIH0sIGNoaWxkcmVuKSkpO1xuLyoqXG4gKiBBcHBcbiAqL1xuY29uc3QgQXBwID0gKCkgPT4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQXBwTGF5b3V0LCBudWxsLFxuICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUm93LCBudWxsLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KExheW91dCwgeyBoYXNTaWRlcjogdHJ1ZSB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChDb2wsIHsgY2xhc3NOYW1lOiBzdHlsZXMubWFpbk1lbnUsIHNwYW46IDYsIHhzOiAyNCwgc206IDEyLCBtZDogMTAsIGxnOiA4LCB4bDogNiB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQXBwTmF2aWdhdGlvbiwgbnVsbCkpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChDb2wsIHsgc3BhbjogMTggfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEFwcEJvZHksIG51bGwpKSkpKSk7XG5leHBvcnQgZGVmYXVsdCBBcHA7XG4iLCJpbXBvcnQgeyBDb21wYW55TWVudSwgUHJvZmlsZU1lbnUsIFJvb3RNZW51IH0gZnJvbSAnYXBwL25hdmlnYXRpb24vc2Vjb25kYXJ5JztcbmltcG9ydCBSZWFjdCwgeyBjcmVhdGVDb250ZXh0LCB1c2VDb250ZXh0LCB1c2VNZW1vLCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcmltYXJ5IGZyb20gJ2FwcC9uYXZpZ2F0aW9uL3ByaW1hcnknO1xuaW1wb3J0IHsgU3dpdGNoIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5leHBvcnQgY29uc3QgTmF2aWdhdGlvbkNvbnRleHQgPSBjcmVhdGVDb250ZXh0KHt9KTtcbmNvbnN0IE5hdmlnYXRpb24gPSAocHJvcHMpID0+IHtcbiAgICBjb25zdCBbcm91dGUsIHNldFJvdXRlXSA9IHVzZVN0YXRlKCcnKTtcbiAgICBjb25zdCB2YWx1ZSA9IHVzZU1lbW8oKCkgPT4gKHsgcm91dGUsIHNldFJvdXRlIH0pLCBbcm91dGVdKTtcbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoU3dpdGNoLCBudWxsLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KE5hdmlnYXRpb25Db250ZXh0LlByb3ZpZGVyLCB7IHZhbHVlOiB2YWx1ZSB9LCBwcm9wcy5jaGlsZHJlbikpKTtcbn07XG5leHBvcnQgY29uc3QgdXNlTmF2aWdhdGlvbkNvbnRleHQgPSAoKSA9PiB7XG4gICAgY29uc3QgY29udGV4dCA9IHVzZUNvbnRleHQoTmF2aWdhdGlvbkNvbnRleHQpO1xuICAgIGlmICghY29udGV4dCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05hdmlnYXRpb24gY29tcG91bmQgY29tcG9uZW50cyBjYW5ub3QgYmUgcmVuZGVyZWQgb3V0c2lkZSB0aGUgTmF2aWdhdGlvbiBjb21wb25lbnQnKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbnRleHQ7XG59O1xuZXhwb3J0IHsgTmF2aWdhdGlvbiwgUHJpbWFyeSwgUm9vdE1lbnUsIENvbXBhbnlNZW51LCBQcm9maWxlTWVudSB9O1xuZXhwb3J0IGRlZmF1bHQgTmF2aWdhdGlvbjtcbiIsImltcG9ydCB7IEF2YXRhciwgQnV0dG9uLCBMYXlvdXQsIE1lbnUsIE1vZGFsIH0gZnJvbSAnYW50ZCc7XG5pbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgQ29tcGFueSBmcm9tICdjb250YWluZXJzL2NvbXBhbnknO1xuaW1wb3J0IHsgTGluayB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuaW1wb3J0IHsgVXNlck91dGxpbmVkIH0gZnJvbSAnQGFudC1kZXNpZ24vaWNvbnMnO1xuaW1wb3J0IHN0eWxlcyBmcm9tICdhcHAvbmF2aWdhdGlvbi9zdHlsZS5tb2R1bGUubGVzcyc7XG5jb25zdCB7IFNpZGVyIH0gPSBMYXlvdXQ7XG5jb25zdCBQcmltYXJ5ID0gKHsgdXNlciB9KSA9PiB7XG4gICAgY29uc3QgW3NlbGVjdGVkTWVudSwgY2hhbmdlU2VsZWN0ZWRNZW51XSA9IHVzZVN0YXRlKCcxJyk7XG4gICAgY29uc3QgW3Zpc2libGUsIHNldFZpc2libGVdID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgIGNvbnN0IGlzU2VsZWN0ZWRNZW51ID0gKG1lbnVLZXkpID0+IChzZWxlY3RlZE1lbnUgPT09IG1lbnVLZXkgPyBzdHlsZXMuc2VsZWN0ZWQgOiAnJyk7XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFNpZGVyLCB7IHRyaWdnZXI6IG51bGwsIHdpZHRoOiBcIjEwMCVcIiwgY2xhc3NOYW1lOiBzdHlsZXMubmF2aWdhdGlvbiB9LFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KE1lbnUsIHsgZGVmYXVsdFNlbGVjdGVkS2V5czogWycxJ10sIG1vZGU6IFwiaW5saW5lXCIsIHRoZW1lOiBcImRhcmtcIiwgY2xhc3NOYW1lOiBgJHtzdHlsZXMucHJpbWFyeX1gIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KE1lbnUuSXRlbSwgeyBrZXk6IFwiMVwiLCB0aXRsZTogXCJvb2pvYlwiLCBjbGFzc05hbWU6IGlzU2VsZWN0ZWRNZW51KCcxJyksIG9uQ2xpY2s6ICh7IGtleSB9KSA9PiBjaGFuZ2VTZWxlY3RlZE1lbnUoa2V5KSB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTGluaywgeyB0bzogXCIvXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChBdmF0YXIsIHsgc3R5bGU6IHsgYmFja2dyb3VuZENvbG9yOiAnIzg3ZDA2OCcgfSwgaWNvbjogUmVhY3QuY3JlYXRlRWxlbWVudChVc2VyT3V0bGluZWQsIG51bGwpIH0pKSksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KE1lbnUuSXRlbSwgeyBrZXk6IFwiMlwiLCB0aXRsZTogXCJwcm9maWxlXCIsIGNsYXNzTmFtZTogaXNTZWxlY3RlZE1lbnUoJzInKSwgb25DbGljazogKHsga2V5IH0pID0+IGNoYW5nZVNlbGVjdGVkTWVudShrZXkpIH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChMaW5rLCB7IHRvOiBcIi9wcm9maWxlXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChBdmF0YXIsIG51bGwsIFwiUFwiKSkpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChNZW51Lkl0ZW0sIHsga2V5OiBcIjNcIiwgdGl0bGU6IFwiY29tcGFueVwiLCBjbGFzc05hbWU6IGlzU2VsZWN0ZWRNZW51KCczJyksIG9uQ2xpY2s6ICh7IGtleSB9KSA9PiBjaGFuZ2VTZWxlY3RlZE1lbnUoa2V5KSB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTGluaywgeyB0bzogXCIvY29tcGFueVwiIH0sXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQXZhdGFyLCBudWxsLCBcIkNcIikpKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTWVudS5JdGVtLCB7IGtleTogXCI0XCIsIHRpdGxlOiBcIkFkZCBBIENvbXBhbnlcIiB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnV0dG9uLCB7IHR5cGU6IFwicHJpbWFyeVwiLCBzaGFwZTogXCJjaXJjbGVcIiwgb25DbGljazogKCkgPT4gc2V0VmlzaWJsZSghdmlzaWJsZSkgfSwgXCIrXCIpKSksXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTW9kYWwsIHsgdGl0bGU6IFwiY3JlYXRlIGNvbXBhbnlcIiwgd2lkdGg6IDcyMCwgY2xvc2FibGU6IGZhbHNlLCB2aXNpYmxlOiB2aXNpYmxlLCBvbkNhbmNlbDogKCkgPT4gc2V0VmlzaWJsZSghdmlzaWJsZSksIGZvb3RlcjogbnVsbCB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChDb21wYW55LCBudWxsKSkpKTtcbn07XG5leHBvcnQgZGVmYXVsdCBQcmltYXJ5O1xuIiwiaW1wb3J0IHsgVXBsb2FkT3V0bGluZWQsIFVzZXJPdXRsaW5lZCwgVmlkZW9DYW1lcmFPdXRsaW5lZCB9IGZyb20gJ0BhbnQtZGVzaWduL2ljb25zJztcbmltcG9ydCB7IExpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmltcG9ydCB7IE1lbnUgfSBmcm9tICdhbnRkJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgc3R5bGVzIGZyb20gJ2FwcC9uYXZpZ2F0aW9uL3N0eWxlLm1vZHVsZS5sZXNzJztcbmV4cG9ydCBjb25zdCBSb290TWVudSA9IChwcm9wcykgPT4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoTWVudSwgeyB0aGVtZTogXCJkYXJrXCIsIG1vZGU6IFwiaW5saW5lXCIsIGRlZmF1bHRTZWxlY3RlZEtleXM6IFsnMSddLCBjbGFzc05hbWU6IHN0eWxlcy5zZWNvbmRhcnkgfSxcbiAgICBSZWFjdC5jcmVhdGVFbGVtZW50KE1lbnUuSXRlbSwgeyBrZXk6IFwiMVwiLCBjbGFzc05hbWU6IHN0eWxlcy5ob3ZlcmVkIH0sXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTGluaywgeyB0bzogYCR7cHJvcHMubG9jYXRpb24ucGF0aG5hbWV9L2ZlZWRzYCB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChVc2VyT3V0bGluZWQsIG51bGwpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgXCJSb290IE1lbnUgMVwiKSkpLFxuICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTWVudS5JdGVtLCB7IGtleTogXCIyXCIsIGNsYXNzTmFtZTogc3R5bGVzLmhvdmVyZWQgfSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChWaWRlb0NhbWVyYU91dGxpbmVkLCBudWxsKSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgXCJSb290IE1lbnUgMlwiKSksXG4gICAgUmVhY3QuY3JlYXRlRWxlbWVudChNZW51Lkl0ZW0sIHsga2V5OiBcIjNcIiwgY2xhc3NOYW1lOiBzdHlsZXMuaG92ZXJlZCB9LFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFVwbG9hZE91dGxpbmVkLCBudWxsKSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgXCJSb290IE1lbnUgM1wiKSkpKTtcbmV4cG9ydCBjb25zdCBQcm9maWxlTWVudSA9IChwcm9wcykgPT4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoTWVudSwgeyB0aGVtZTogXCJkYXJrXCIsIG1vZGU6IFwiaW5saW5lXCIsIGRlZmF1bHRTZWxlY3RlZEtleXM6IFsnMSddLCBjbGFzc05hbWU6IHN0eWxlcy5zZWNvbmRhcnkgfSxcbiAgICBSZWFjdC5jcmVhdGVFbGVtZW50KE1lbnUuSXRlbSwgeyBrZXk6IFwiMVwiLCBjbGFzc05hbWU6IHN0eWxlcy5ob3ZlcmVkIH0sXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVXNlck91dGxpbmVkLCBudWxsKSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChMaW5rLCB7IHRvOiBgJHtwcm9wcy5sb2NhdGlvbi5wYXRobmFtZX0vZmVlZGAgfSwgXCJwcm9maWxlXCIpKSkpO1xuZXhwb3J0IGNvbnN0IENvbXBhbnlNZW51ID0gKHByb3BzKSA9PiAoUmVhY3QuY3JlYXRlRWxlbWVudChNZW51LCB7IHRoZW1lOiBcImRhcmtcIiwgbW9kZTogXCJpbmxpbmVcIiwgZGVmYXVsdFNlbGVjdGVkS2V5czogWycxJ10sIGNsYXNzTmFtZTogc3R5bGVzLnNlY29uZGFyeSB9LFxuICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTWVudS5JdGVtLCB7IGtleTogXCIxXCIsIGNsYXNzTmFtZTogc3R5bGVzLmhvdmVyZWQgfSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChVc2VyT3V0bGluZWQsIG51bGwpLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KExpbmssIHsgdG86IGAke3Byb3BzLmxvY2F0aW9uLnBhdGhuYW1lfS9mZWVkc2AgfSwgXCJjb21wYW5pZXNcIikpLFxuICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTWVudS5JdGVtLCB7IGtleTogXCIxXCIsIGNsYXNzTmFtZTogc3R5bGVzLmhvdmVyZWQgfSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChVc2VyT3V0bGluZWQsIG51bGwpLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KExpbmssIHsgdG86IGAke3Byb3BzLmxvY2F0aW9uLnBhdGhuYW1lfS9Kb2JzYCB9LCBcIkpvYnNcIikpKSk7XG4iLCJcbiAgICB2YXIgcmVmcyA9IDA7XG4gICAgdmFyIGNzcyA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9sZXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLm1vZHVsZS5sZXNzXCIpO1xuICAgIHZhciBpbnNlcnRDc3MgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9pc29tb3JwaGljLXN0eWxlLWxvYWRlci9pbnNlcnRDc3MuanNcIik7XG4gICAgdmFyIGNvbnRlbnQgPSB0eXBlb2YgY3NzID09PSAnc3RyaW5nJyA/IFtbbW9kdWxlLmlkLCBjc3MsICcnXV0gOiBjc3M7XG5cbiAgICBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBjc3MubG9jYWxzIHx8IHt9O1xuICAgIGV4cG9ydHMuX2dldENvbnRlbnQgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQ7IH07XG4gICAgZXhwb3J0cy5fZ2V0Q3NzID0gZnVuY3Rpb24oKSB7IHJldHVybiAnJyArIGNzczsgfTtcbiAgICBleHBvcnRzLl9pbnNlcnRDc3MgPSBmdW5jdGlvbihvcHRpb25zKSB7IHJldHVybiBpbnNlcnRDc3MoY29udGVudCwgb3B0aW9ucykgfTtcblxuICAgIC8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbiAgICAvLyBodHRwczovL3dlYnBhY2suZ2l0aHViLmlvL2RvY3MvaG90LW1vZHVsZS1yZXBsYWNlbWVudFxuICAgIC8vIE9ubHkgYWN0aXZhdGVkIGluIGJyb3dzZXIgY29udGV4dFxuICAgIGlmIChtb2R1bGUuaG90ICYmIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5kb2N1bWVudCkge1xuICAgICAgdmFyIHJlbW92ZUNzcyA9IGZ1bmN0aW9uKCkge307XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xlc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUubW9kdWxlLmxlc3NcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNzcyA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9sZXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLm1vZHVsZS5sZXNzXCIpO1xuICAgICAgICBjb250ZW50ID0gdHlwZW9mIGNzcyA9PT0gJ3N0cmluZycgPyBbW21vZHVsZS5pZCwgY3NzLCAnJ11dIDogY3NzO1xuICAgICAgICByZW1vdmVDc3MgPSBpbnNlcnRDc3MoY29udGVudCwgeyByZXBsYWNlOiB0cnVlIH0pO1xuICAgICAgfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHJlbW92ZUNzcygpOyB9KTtcbiAgICB9XG4gICIsImltcG9ydCB7IEJ1dHRvbiwgQ29sLCBMYXlvdXQsIE1vZGFsLCBSb3csIFR5cG9ncmFwaHkgfSBmcm9tICdhbnRkJztcbmltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBKb2JGb3JtIGZyb20gJy4uLy4uL2Zvcm0vam9iL2Zvcm0nO1xuLy8gaW1wb3J0IHN0eWxlIGZyb20gJ3N0eWxlLm1vZHVsZS5sZXNzJ1xuaW1wb3J0IHsgUGx1c0NpcmNsZU91dGxpbmVkIH0gZnJvbSAnQGFudC1kZXNpZ24vaWNvbnMnO1xuaW1wb3J0IHsgbXV0YXRpb25DcmVhdGVKb2IgfSBmcm9tICdncmFwaC9jb21wYW55L211dGF0aW9vbic7XG5pbXBvcnQgeyB1c2VNdXRhdGlvbiB9IGZyb20gJ0BhcG9sbG8vY2xpZW50JztcbmltcG9ydCB7IHdpdGhSb3V0ZXIgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmNvbnN0IHsgQ29udGVudCB9ID0gTGF5b3V0O1xuY29uc3QgeyBUaXRsZSB9ID0gVHlwb2dyYXBoeTtcbmNvbnN0IEpvYlBhZ2UgPSAoKSA9PiB7XG4gICAgY29uc3QgW3Zpc2libGUsIHNldFZpc2libGVdID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgIGNvbnN0IFthZGRKb2IsIHsgbG9hZGluZywgZGF0YSB9XSA9IHVzZU11dGF0aW9uKG11dGF0aW9uQ3JlYXRlSm9iKTtcbiAgICBjb25zdCBvblN1Ym1pdCA9ICh2YWx1ZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2codmFsdWVzKTtcbiAgICAgICAgLy8gYWRkSm9iKHtcbiAgICAgICAgLy8gXHR2YXJpYWJsZXM6IHtcbiAgICAgICAgLy8gXHRcdGlucHV0OiB7XG4gICAgICAgIC8vIFx0XHRcdGNvbXBhbnk6ICd4eXonLFxuICAgICAgICAvLyBcdFx0XHQuLi52YWx1ZXNcbiAgICAgICAgLy8gXHRcdH1cbiAgICAgICAgLy8gXHR9XG4gICAgICAgIC8vIH0pXG4gICAgfTtcbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoUmVhY3QuRnJhZ21lbnQsIG51bGwsXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ29udGVudCwgeyBjbGFzc05hbWU6IFwiSm9iLWNvbnRlbnRcIiwgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiAyNCxcbiAgICAgICAgICAgICAgICBtYXJnaW46IDAsXG4gICAgICAgICAgICAgICAgbWluSGVpZ2h0OiAyODAsXG4gICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFJvdywgbnVsbCxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KENvbCwgeyBzcGFuOiA4IH0sXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGl0bGUsIHsgbGV2ZWw6IDMgfSwgXCJKT0JTXCIpKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KENvbCwgeyBzcGFuOiA4LCBvZmZzZXQ6IDggfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCdXR0b24sIHsgdHlwZTogXCJwcmltYXJ5XCIsIHNoYXBlOiBcInJvdW5kXCIsIGljb246IFJlYWN0LmNyZWF0ZUVsZW1lbnQoUGx1c0NpcmNsZU91dGxpbmVkLCBudWxsKSwgc2l6ZTogXCJsYXJnZVwiLCBvbkNsaWNrOiAoKSA9PiBzZXRWaXNpYmxlKCF2aXNpYmxlKSB9LCBcIkFkZCBBIEpvYlwiKSkpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImhyXCIsIG51bGwpKSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChNb2RhbCwgeyB0aXRsZTogXCJBZGQgQSBKb2JcIiwgd2lkdGg6IDcyMCwgY2xvc2FibGU6IHRydWUsIHZpc2libGU6IHZpc2libGUsIG9uQ2FuY2VsOiAoKSA9PiBzZXRWaXNpYmxlKCF2aXNpYmxlKSwgZGVzdHJveU9uQ2xvc2U6IHRydWUsIGZvb3RlcjogbnVsbCB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChKb2JGb3JtLCB7IG9uU3VibWl0OiBvblN1Ym1pdCB9KSkpKTtcbn07XG5leHBvcnQgY29uc3QgSm9iID0gd2l0aFJvdXRlcihKb2JQYWdlKTtcbmV4cG9ydCBkZWZhdWx0IEpvYjtcbiIsImltcG9ydCBQYXltZW50Rm9ybSBmcm9tICdhcHAvZm9ybS9wYXltZW50L2Zvcm0nO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmNvbnN0IFBheW1lbnQgPSAoKSA9PiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLFxuICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUGF5bWVudEZvcm0sIG51bGwpKSk7XG5leHBvcnQgZGVmYXVsdCBQYXltZW50O1xuIiwiaW1wb3J0IExvYWRpbmcgZnJvbSAnY29tcG9uZW50cy9sb2FkaW5nJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB3aXRoUm91dGVyIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5jb25zdCBQcm9maWxlQmFzZSA9ICgpID0+IHtcbiAgICBjb25zdCB7IHVzZXIsIGlzTG9hZGluZyB9ID0ge1xuICAgICAgICB1c2VyOiB7IHBpY3R1cmU6IFwiaHR0cDovL2R1bW15LmR1Y2tcIiwgZW1haWw6IFwiZG9kb0BkdWNrXCIsIG5hbWU6IFwiZHVtbXkgdXNlclwiIH0sXG4gICAgICAgIGlzTG9hZGluZzogZmFsc2VcbiAgICB9O1xuICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChMb2FkaW5nLCB7IGxvYWRpbmc6IGlzTG9hZGluZyB8fCAhdXNlciB9LFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW1nXCIsIHsgc3JjOiB1c2VyLnBpY3R1cmUsIGFsdDogXCJQcm9maWxlXCIgfSksXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJoMlwiLCBudWxsLCB1c2VyLm5hbWUpLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwicFwiLCBudWxsLCB1c2VyLmVtYWlsKSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImNvZGVcIiwgbnVsbCwgSlNPTi5zdHJpbmdpZnkodXNlciwgbnVsbCwgMikpKSk7XG59O1xuZXhwb3J0IGNvbnN0IFByb2ZpbGUgPSB3aXRoUm91dGVyKFByb2ZpbGVCYXNlKTtcbmV4cG9ydCBkZWZhdWx0IFByb2ZpbGU7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuY29uc3QgVGV4dCA9ICgpID0+IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCxcbiAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwicFwiLCBudWxsLCBcIlRlc3QgUGFnZSAuLi5cIikpO1xuZXhwb3J0IGRlZmF1bHQgVGV4dDtcbiIsImltcG9ydCB7IENvbXBhbnlNZW51LCBSb290TWVudSB9IGZyb20gJ2FwcC9uYXZpZ2F0aW9uJztcbmltcG9ydCB7IFJvdXRlLCBTd2l0Y2ggfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmltcG9ydCBKb2IgZnJvbSAnYXBwL3BhZ2VzL2pvYi9wYWdlJztcbmltcG9ydCBQYXltZW50IGZyb20gJ2FwcC9wYWdlcy9wYXltZW50L3BhZ2UnO1xuaW1wb3J0IFByb2ZpbGUgZnJvbSAnYXBwL3BhZ2VzL3Byb2ZpbGUvcGFnZSc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFRlc3QgZnJvbSAnYXBwL3BhZ2VzL3Rlc3QvcGFnZSc7XG5pbXBvcnQgc3R5bGUgZnJvbSAnYXBwL3N0eWxlLm1vZHVsZS5sZXNzJztcbmV4cG9ydCBjb25zdCBQcmltYXJ5Um91dGVzID0gKCkgPT4gUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogc3R5bGUucm91dGVzIH0sXG4gICAgUmVhY3QuY3JlYXRlRWxlbWVudChTd2l0Y2gsIG51bGwsXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUm91dGUsIHsgcGF0aDogXCIvXCIsIGV4YWN0OiB0cnVlLCBjb21wb25lbnQ6IFJvb3RNZW51IH0pLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFJvdXRlLCB7IHBhdGg6IFwiL2NvbXBhbnlcIiwgY29tcG9uZW50OiBDb21wYW55TWVudSB9KSkpO1xuZXhwb3J0IGNvbnN0IFNlY29uZGFyeVJvdXRlcyA9ICgpID0+IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IHN0eWxlLnJvdXRlcyB9LFxuICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU3dpdGNoLCBudWxsLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFJvdXRlLCB7IHBhdGg6IFwiL1wiLCBleGFjdDogdHJ1ZSwgY29tcG9uZW50OiBUZXN0IH0pLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFJvdXRlLCB7IHBhdGg6IFwiL3Byb2ZpbGUvZmVlZFwiLCBjb21wb25lbnQ6IFByb2ZpbGUgfSksXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUm91dGUsIHsgcGF0aDogXCIvY29tcGFueS9qb2JzXCIsIGNvbXBvbmVudDogSm9iIH0pLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFJvdXRlLCB7IHBhdGg6IFwiL3Byb2ZpbGUvcGF5bWVudFwiLCBjb21wb25lbnQ6IFBheW1lbnQgfSkpKTtcbiIsIlxuICAgIHZhciByZWZzID0gMDtcbiAgICB2YXIgY3NzID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL2xlc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUubW9kdWxlLmxlc3NcIik7XG4gICAgdmFyIGluc2VydENzcyA9IHJlcXVpcmUoXCIhLi4vLi4vbm9kZV9tb2R1bGVzL2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2luc2VydENzcy5qc1wiKTtcbiAgICB2YXIgY29udGVudCA9IHR5cGVvZiBjc3MgPT09ICdzdHJpbmcnID8gW1ttb2R1bGUuaWQsIGNzcywgJyddXSA6IGNzcztcblxuICAgIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGNzcy5sb2NhbHMgfHwge307XG4gICAgZXhwb3J0cy5fZ2V0Q29udGVudCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29udGVudDsgfTtcbiAgICBleHBvcnRzLl9nZXRDc3MgPSBmdW5jdGlvbigpIHsgcmV0dXJuICcnICsgY3NzOyB9O1xuICAgIGV4cG9ydHMuX2luc2VydENzcyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHsgcmV0dXJuIGluc2VydENzcyhjb250ZW50LCBvcHRpb25zKSB9O1xuXG4gICAgLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuICAgIC8vIGh0dHBzOi8vd2VicGFjay5naXRodWIuaW8vZG9jcy9ob3QtbW9kdWxlLXJlcGxhY2VtZW50XG4gICAgLy8gT25seSBhY3RpdmF0ZWQgaW4gYnJvd3NlciBjb250ZXh0XG4gICAgaWYgKG1vZHVsZS5ob3QgJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50KSB7XG4gICAgICB2YXIgcmVtb3ZlQ3NzID0gZnVuY3Rpb24oKSB7fTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvbGVzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5tb2R1bGUubGVzc1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY3NzID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL2xlc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUubW9kdWxlLmxlc3NcIik7XG4gICAgICAgIGNvbnRlbnQgPSB0eXBlb2YgY3NzID09PSAnc3RyaW5nJyA/IFtbbW9kdWxlLmlkLCBjc3MsICcnXV0gOiBjc3M7XG4gICAgICAgIHJlbW92ZUNzcyA9IGluc2VydENzcyhjb250ZW50LCB7IHJlcGxhY2U6IHRydWUgfSk7XG4gICAgICB9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgcmVtb3ZlQ3NzKCk7IH0pO1xuICAgIH1cbiAgIiwiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgSW5wdXQsIFNlbGVjdCB9IGZyb20gJ2FudGQnO1xuY29uc3QgeyBPcHRpb24gfSA9IFNlbGVjdDtcbmNvbnN0IFNhbGFyeUlucHV0ID0gKHsgc2FsYXJ5ID0ge30sIG9uQ2hhbmdlIH0pID0+IHtcbiAgICBjb25zdCBbdmFsdWUsIHNldFZhbHVlXSA9IHVzZVN0YXRlKDApO1xuICAgIGNvbnN0IFtjdXJyZW5jeSwgc2V0Q3VycmVuY3ldID0gdXNlU3RhdGUoJ0lOUicpO1xuICAgIGNvbnN0IHRyaWdnZXJDaGFuZ2UgPSBjaGFuZ2VkVmFsdWUgPT4ge1xuICAgICAgICBpZiAob25DaGFuZ2UpIHtcbiAgICAgICAgICAgIG9uQ2hhbmdlKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7IHZhbHVlLCBjdXJyZW5jeSB9LCBzYWxhcnkpLCBjaGFuZ2VkVmFsdWUpKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3Qgb25OdW1iZXJDaGFuZ2UgPSBlID0+IHtcbiAgICAgICAgY29uc3QgbmV3VmFsdWUgPSBwYXJzZUludChlLnRhcmdldC52YWx1ZSB8fCAwLCAxMCk7XG4gICAgICAgIGlmIChOdW1iZXIuaXNOYU4odmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCEoJ3ZhbHVlJyBpbiBzYWxhcnkpKSB7XG4gICAgICAgICAgICBzZXRWYWx1ZShuZXdWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgdHJpZ2dlckNoYW5nZSh7IHZhbHVlOiBuZXdWYWx1ZSB9KTtcbiAgICB9O1xuICAgIGNvbnN0IG9uQ3VycmVuY3lDaGFuZ2UgPSBuZXdDdXJyZW5jeSA9PiB7XG4gICAgICAgIGlmICghKCdjdXJyZW5jeScgaW4gc2FsYXJ5KSkge1xuICAgICAgICAgICAgc2V0Q3VycmVuY3kobmV3Q3VycmVuY3kpO1xuICAgICAgICB9XG4gICAgICAgIHRyaWdnZXJDaGFuZ2UoeyBjdXJyZW5jeTogbmV3Q3VycmVuY3kgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoUmVhY3QuRnJhZ21lbnQsIG51bGwsXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXQsIHsgdHlwZTogXCJ0ZXh0XCIsIHZhbHVlOiBzYWxhcnkudmFsdWUgfHwgdmFsdWUsIG9uQ2hhbmdlOiBvbk51bWJlckNoYW5nZSwgc3R5bGU6IHsgd2lkdGg6ICc2MCUnIH0gfSksXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VsZWN0LCB7IHZhbHVlOiBzYWxhcnkuY3VycmVuY3kgfHwgY3VycmVuY3ksIHN0eWxlOiB7IHdpZHRoOiAnNDAlJyB9LCBvbkNoYW5nZTogb25DdXJyZW5jeUNoYW5nZSB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChPcHRpb24sIHsgdmFsdWU6IFwiSU5SXCIgfSwgXCJJTlJcIiksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KE9wdGlvbiwgeyB2YWx1ZTogXCJVU0RcIiB9LCBcIlVTRFwiKSkpKTtcbn07XG5leHBvcnQgZGVmYXVsdCBTYWxhcnlJbnB1dDtcbiIsImltcG9ydCB7IExvYWRpbmdPdXRsaW5lZCB9IGZyb20gXCJAYW50LWRlc2lnbi9pY29uc1wiO1xuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgU3BpbiB9IGZyb20gXCJhbnRkXCI7XG5pbXBvcnQgc3R5bGUgZnJvbSAnY29tcG9uZW50cy9sb2FkaW5nL3N0eWxlLm1vZHVsZS5sZXNzJztcbmV4cG9ydCBjb25zdCBsb2FkaW5nSWNvbiA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoTG9hZGluZ091dGxpbmVkLCB7IHN0eWxlOiB7IGZvbnRTaXplOiAyNCB9LCBzcGluOiB0cnVlIH0pO1xuY29uc3QgTG9hZGluZyA9ICh7IGNoaWxkcmVuLCBsb2FkaW5nLCBtZXNzYWdlIH0pID0+IChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBzdHlsZS5sb2FkaW5nIH0sXG4gICAgUmVhY3QuY3JlYXRlRWxlbWVudChTcGluLCB7IGluZGljYXRvcjogbG9hZGluZ0ljb24sIHRpcDogbWVzc2FnZSwgZGVsYXk6IDUwMCwgY2xhc3NOYW1lOiBzdHlsZS5wYWdlLCBzcGlubmluZzogbG9hZGluZyB9LCBjaGlsZHJlbikpKTtcbmV4cG9ydCBkZWZhdWx0IExvYWRpbmc7XG4iLCJcbiAgICB2YXIgcmVmcyA9IDA7XG4gICAgdmFyIGNzcyA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9sZXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLm1vZHVsZS5sZXNzXCIpO1xuICAgIHZhciBpbnNlcnRDc3MgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9pc29tb3JwaGljLXN0eWxlLWxvYWRlci9pbnNlcnRDc3MuanNcIik7XG4gICAgdmFyIGNvbnRlbnQgPSB0eXBlb2YgY3NzID09PSAnc3RyaW5nJyA/IFtbbW9kdWxlLmlkLCBjc3MsICcnXV0gOiBjc3M7XG5cbiAgICBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBjc3MubG9jYWxzIHx8IHt9O1xuICAgIGV4cG9ydHMuX2dldENvbnRlbnQgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQ7IH07XG4gICAgZXhwb3J0cy5fZ2V0Q3NzID0gZnVuY3Rpb24oKSB7IHJldHVybiAnJyArIGNzczsgfTtcbiAgICBleHBvcnRzLl9pbnNlcnRDc3MgPSBmdW5jdGlvbihvcHRpb25zKSB7IHJldHVybiBpbnNlcnRDc3MoY29udGVudCwgb3B0aW9ucykgfTtcblxuICAgIC8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbiAgICAvLyBodHRwczovL3dlYnBhY2suZ2l0aHViLmlvL2RvY3MvaG90LW1vZHVsZS1yZXBsYWNlbWVudFxuICAgIC8vIE9ubHkgYWN0aXZhdGVkIGluIGJyb3dzZXIgY29udGV4dFxuICAgIGlmIChtb2R1bGUuaG90ICYmIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5kb2N1bWVudCkge1xuICAgICAgdmFyIHJlbW92ZUNzcyA9IGZ1bmN0aW9uKCkge307XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xlc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUubW9kdWxlLmxlc3NcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNzcyA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9sZXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLm1vZHVsZS5sZXNzXCIpO1xuICAgICAgICBjb250ZW50ID0gdHlwZW9mIGNzcyA9PT0gJ3N0cmluZycgPyBbW21vZHVsZS5pZCwgY3NzLCAnJ11dIDogY3NzO1xuICAgICAgICByZW1vdmVDc3MgPSBpbnNlcnRDc3MoY29udGVudCwgeyByZXBsYWNlOiB0cnVlIH0pO1xuICAgICAgfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHJlbW92ZUNzcygpOyB9KTtcbiAgICB9XG4gICIsImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IElucHV0TnVtYmVyIH0gZnJvbSAnYW50ZCc7XG5jb25zdCBSYW5nZSA9ICh7IHZhbHVlID0ge30sIG9uQ2hhbmdlIH0pID0+IHtcbiAgICBjb25zdCBbbWluLCBzZXRNaW5dID0gdXNlU3RhdGUoMCk7XG4gICAgY29uc3QgW21heCwgc2V0TWF4XSA9IHVzZVN0YXRlKDApO1xuICAgIGNvbnN0IHRyaWdnZXJDaGFuZ2UgPSAoY2hhbmdlZFZhbHVlKSA9PiB7XG4gICAgICAgIGlmIChvbkNoYW5nZSkge1xuICAgICAgICAgICAgb25DaGFuZ2UoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHsgbWluLFxuICAgICAgICAgICAgICAgIG1heCB9LCB2YWx1ZSksIGNoYW5nZWRWYWx1ZSkpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBvbk1pbkNoYW5nZSA9IChtaW4pID0+IHtcbiAgICAgICAgaWYgKG1pbikge1xuICAgICAgICAgICAgc2V0TWluKG1pbik7XG4gICAgICAgICAgICB0cmlnZ2VyQ2hhbmdlKHtcbiAgICAgICAgICAgICAgICBtaW5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBvbk1heENoYW5nZSA9IChtYXgpID0+IHtcbiAgICAgICAgaWYgKG1heCkge1xuICAgICAgICAgICAgaWYgKCEoJ21heCcgaW4gdmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgc2V0TWF4KG1heCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0cmlnZ2VyQ2hhbmdlKHtcbiAgICAgICAgICAgICAgICBtYXhcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoUmVhY3QuRnJhZ21lbnQsIG51bGwsXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXROdW1iZXIsIHsgdmFsdWU6IHZhbHVlLm1pbiB8fCBtaW4sIG9uQ2hhbmdlOiBvbk1pbkNoYW5nZSwgc3R5bGU6IHsgZGlzcGxheTogJ2lubGluZS1ibG9jaycsIHdpZHRoOiAnY2FsYyg1MCUgLSA4cHgpJyB9LCBwbGFjZWhvbGRlcjogXCJNaW5cIiB9KSxcbiAgICAgICAgJyAnLFxuICAgICAgICBcIi1cIixcbiAgICAgICAgJyAnLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0TnVtYmVyLCB7IHZhbHVlOiB2YWx1ZS5tYXggfHwgbWF4LCBvbkNoYW5nZTogb25NYXhDaGFuZ2UsIHN0eWxlOiB7IGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLCB3aWR0aDogJ2NhbGMoNTAlIC0gOHB4KScgfSwgcGxhY2Vob2xkZXI6IFwiTWF4XCIgfSkpKTtcbn07XG5leHBvcnQgZGVmYXVsdCBSYW5nZTtcbiIsImltcG9ydCB7IEJ1dHRvbiwgQ2hlY2tib3gsIENvbCwgRm9ybSwgSW5wdXQsIFJvdywgU2VsZWN0IH0gZnJvbSAnYW50ZCc7XG5pbXBvcnQgTG9hZGluZyBmcm9tICdjb21wb25lbnRzL2xvYWRpbmcnO1xuaW1wb3J0IFJhbmdlIGZyb20gJ2NvbXBvbmVudHMvcmFuZ2UnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBTZWFyY2ggZnJvbSAnYW50ZC9saWIvaW5wdXQvU2VhcmNoJztcbmltcG9ydCBVcGxvYWRDb21wYW55UGljdHVyZSBmcm9tICdjb250YWluZXJzL2NvbXBhbnkvdXBsb2FkJztcbmltcG9ydCB7IG11dGF0aW9uQ3JlYXRlQ29tcGFueSB9IGZyb20gJ2dyYXBoL2NvbXBhbnkvbXV0YXRpb29uJztcbmltcG9ydCBzdHlsZSBmcm9tICdjb250YWluZXJzL2NvbXBhbnkvc3R5bGUubW9kdWxlLmxlc3MnO1xuaW1wb3J0IHsgdXNlTXV0YXRpb24gfSBmcm9tICdAYXBvbGxvL2NsaWVudCc7XG5jb25zdCBDb21wYW55ID0gKCkgPT4ge1xuICAgIGNvbnN0IFthZGRDb21wYW55LCB7IGxvYWRpbmcsIGRhdGEgfV0gPSB1c2VNdXRhdGlvbihtdXRhdGlvbkNyZWF0ZUNvbXBhbnkpO1xuICAgIGNvbnN0IG9uU3VibWl0ID0gKHZhbHVlcykgPT4ge1xuICAgICAgICBhZGRDb21wYW55KHtcbiAgICAgICAgICAgIHZhcmlhYmxlczoge1xuICAgICAgICAgICAgICAgIGlucHV0OiBPYmplY3QuYXNzaWduKHsgY3JlYXRlZEJ5OiAnMTIzNDU2Nzg5JyB9LCB2YWx1ZXMpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgY29uc3QgdmFsaWRhdGVSYW5nZSA9IChydWxlLCB2YWx1ZSkgPT4ge1xuICAgICAgICBpZiAoISh2YWx1ZS5taW4gPiAwKSkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCdNaW4gdmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gemVybyEnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoISh2YWx1ZS5tYXggPiAwKSkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCdNYXggdmFsdWVzIG11c3QgYmUgZ3JlYXRlciB0aGFuIHplcm8hJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZhbHVlLm1pbiA+PSB2YWx1ZS5tYXgpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgnTWF4IHZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIE1pbiB2YWx1ZScpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9O1xuICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChMb2FkaW5nLCB7IGxvYWRpbmc6IGxvYWRpbmcgfSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChSb3csIG51bGwsXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KENvbCwgeyBzcGFuOiAxMCwgY2xhc3NOYW1lOiBzdHlsZS5jb21wYW55IH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChVcGxvYWRDb21wYW55UGljdHVyZSwgbnVsbCksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgXCJ1cGxvYWQgeW91ciBjb21wYW55IGxvZ29cIikpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChDb2wsIHsgc3BhbjogMTQgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEZvcm0sIHsgbmFtZTogXCJjb21wYW55XCIsIG9uRmluaXNoOiBvblN1Ym1pdCwgaW5pdGlhbFZhbHVlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9PZkVtcGxveWVlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbjogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXg6IDBcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEZvcm0uSXRlbSwgeyBuYW1lOiBcIm5hbWVcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dCwgeyBwbGFjZWhvbGRlcjogXCJDb21wYW55IE5hbWVcIiB9KSksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRm9ybS5JdGVtLCB7IG5hbWU6IFwiZGVzY3JpcHRpb25cIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dC5UZXh0QXJlYSwgeyByb3dzOiA0LCBwbGFjZWhvbGRlcjogXCJFbnRlciBkZXNjcmlwdGlvbiBmb3IgeW91ciBjb21wYW55XCIgfSkpLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEZvcm0uSXRlbSwgeyBuYW1lOiBcInVybFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0LCB7IHR5cGU6IFwidXJsXCIsIGRlZmF1bHRWYWx1ZTogXCJteXNpdGUuY29tXCIgfSkpLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEZvcm0uSXRlbSwgeyBuYW1lOiBcInNraWxsc1wiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFNlbGVjdCwgeyBtb2RlOiBcInRhZ3NcIiwgc3R5bGU6IHsgd2lkdGg6ICcxMDAlJyB9LCBwbGFjZWhvbGRlcjogXCJTa2lsbHMgeW91ciBjb21wYW55IGRlbWFuZCA/XCIgfSwgW10pKSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChGb3JtLkl0ZW0sIHsgbmFtZTogXCJub09mRW1wbG95ZWVzXCIsIGxhYmVsOiBcIk5vLiBvZiBFbXBsb3llZXNcIiwgcnVsZXM6IFt7IHZhbGlkYXRvcjogdmFsaWRhdGVSYW5nZSB9XSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChSYW5nZSwgbnVsbCkpLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEZvcm0uSXRlbSwgeyBuYW1lOiBcImhpcmluZ1N0YXR1c1wiLCB2YWx1ZVByb3BOYW1lOiBcImNoZWNrZWRcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChDaGVja2JveCwgbnVsbCwgXCJIaXJpbmcgU3RhdHVzXCIpKSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChGb3JtLkl0ZW0sIHsgbmFtZTogXCJsb2NhdGlvblwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFNlYXJjaCwgeyBwbGFjZWhvbGRlcjogXCJjb21wYW55IExvY2F0aW9uLiBleDogQmFuZ2Fsb3JlXCIsIGxvYWRpbmc6IHRydWUgfSkpLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEZvcm0uSXRlbSwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnV0dG9uLCB7IHR5cGU6IFwicHJpbWFyeVwiLCBodG1sVHlwZTogXCJzdWJtaXRcIiB9LCBcIkNyZWF0ZVwiKSkpKSkpKTtcbn07XG5leHBvcnQgZGVmYXVsdCBDb21wYW55O1xuIiwiXG4gICAgdmFyIHJlZnMgPSAwO1xuICAgIHZhciBjc3MgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvbGVzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5tb2R1bGUubGVzc1wiKTtcbiAgICB2YXIgaW5zZXJ0Q3NzID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvaW5zZXJ0Q3NzLmpzXCIpO1xuICAgIHZhciBjb250ZW50ID0gdHlwZW9mIGNzcyA9PT0gJ3N0cmluZycgPyBbW21vZHVsZS5pZCwgY3NzLCAnJ11dIDogY3NzO1xuXG4gICAgZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gY3NzLmxvY2FscyB8fCB7fTtcbiAgICBleHBvcnRzLl9nZXRDb250ZW50ID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50OyB9O1xuICAgIGV4cG9ydHMuX2dldENzcyA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gJycgKyBjc3M7IH07XG4gICAgZXhwb3J0cy5faW5zZXJ0Q3NzID0gZnVuY3Rpb24ob3B0aW9ucykgeyByZXR1cm4gaW5zZXJ0Q3NzKGNvbnRlbnQsIG9wdGlvbnMpIH07XG5cbiAgICAvLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG4gICAgLy8gaHR0cHM6Ly93ZWJwYWNrLmdpdGh1Yi5pby9kb2NzL2hvdC1tb2R1bGUtcmVwbGFjZW1lbnRcbiAgICAvLyBPbmx5IGFjdGl2YXRlZCBpbiBicm93c2VyIGNvbnRleHRcbiAgICBpZiAobW9kdWxlLmhvdCAmJiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuZG9jdW1lbnQpIHtcbiAgICAgIHZhciByZW1vdmVDc3MgPSBmdW5jdGlvbigpIHt9O1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9sZXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLm1vZHVsZS5sZXNzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjc3MgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvbGVzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5tb2R1bGUubGVzc1wiKTtcbiAgICAgICAgY29udGVudCA9IHR5cGVvZiBjc3MgPT09ICdzdHJpbmcnID8gW1ttb2R1bGUuaWQsIGNzcywgJyddXSA6IGNzcztcbiAgICAgICAgcmVtb3ZlQ3NzID0gaW5zZXJ0Q3NzKGNvbnRlbnQsIHsgcmVwbGFjZTogdHJ1ZSB9KTtcbiAgICAgIH0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyByZW1vdmVDc3MoKTsgfSk7XG4gICAgfVxuICAiLCJpbXBvcnQgeyBMb2FkaW5nT3V0bGluZWQsIFBsdXNPdXRsaW5lZCB9IGZyb20gJ0BhbnQtZGVzaWduL2ljb25zJztcbmltcG9ydCB7IFVwbG9hZCwgbWVzc2FnZSB9IGZyb20gJ2FudGQnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBzdHlsZSBmcm9tICdjb250YWluZXJzL2NvbXBhbnkvc3R5bGUubW9kdWxlLmxlc3MnO1xuZnVuY3Rpb24gZ2V0QmFzZTY0KGltZywgY2FsbGJhY2spIHtcbiAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgIHJlYWRlci5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4gY2FsbGJhY2socmVhZGVyLnJlc3VsdCkpO1xuICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGltZyk7XG59XG5mdW5jdGlvbiBiZWZvcmVVcGxvYWQoZmlsZSkge1xuICAgIGNvbnN0IGlzSnBnT3JQbmcgPSBmaWxlLnR5cGUgPT09ICdpbWFnZS9qcGVnJyB8fCBmaWxlLnR5cGUgPT09ICdpbWFnZS9wbmcnO1xuICAgIGlmICghaXNKcGdPclBuZykge1xuICAgICAgICBtZXNzYWdlLmVycm9yKCdZb3UgY2FuIG9ubHkgdXBsb2FkIEpQRy9QTkcgZmlsZSEnKTtcbiAgICB9XG4gICAgY29uc3QgaXNMdDJNID0gZmlsZS5zaXplIC8gMTAyNCAvIDEwMjQgPCAyO1xuICAgIGlmICghaXNMdDJNKSB7XG4gICAgICAgIG1lc3NhZ2UuZXJyb3IoJ0ltYWdlIG11c3Qgc21hbGxlciB0aGFuIDJNQiEnKTtcbiAgICB9XG4gICAgcmV0dXJuIGlzSnBnT3JQbmcgJiYgaXNMdDJNO1xufVxuY2xhc3MgVXBsb2FkQ29tcGFueVBpY3R1cmUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgbG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgICBpbWFnZVVybDogJydcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5oYW5kbGVDaGFuZ2UgPSBpbmZvID0+IHtcbiAgICAgICAgICAgIGlmIChpbmZvLmZpbGUuc3RhdHVzID09PSAndXBsb2FkaW5nJykge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBsb2FkaW5nOiB0cnVlIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpbmZvLmZpbGUuc3RhdHVzID09PSAnZG9uZScpIHtcbiAgICAgICAgICAgICAgICBnZXRCYXNlNjQoaW5mby5maWxlLm9yaWdpbkZpbGVPYmosIGltYWdlVXJsID0+IHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICBpbWFnZVVybCxcbiAgICAgICAgICAgICAgICAgICAgbG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHVwbG9hZEJ1dHRvbiA9IChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsXG4gICAgICAgICAgICB0aGlzLnN0YXRlLmxvYWRpbmcgPyBSZWFjdC5jcmVhdGVFbGVtZW50KExvYWRpbmdPdXRsaW5lZCwgbnVsbCkgOiBSZWFjdC5jcmVhdGVFbGVtZW50KFBsdXNPdXRsaW5lZCwgbnVsbCksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImFudC11cGxvYWQtdGV4dFwiIH0sIFwiVXBsb2FkXCIpKSk7XG4gICAgICAgIGNvbnN0IHsgaW1hZ2VVcmwgfSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChVcGxvYWQsIHsgY2xhc3NOYW1lOiBzdHlsZS51cGxvYWQsIG5hbWU6IFwiYXZhdGFyXCIsIGxpc3RUeXBlOiBcInBpY3R1cmUtY2FyZFwiLCBzaG93VXBsb2FkTGlzdDogZmFsc2UsIGFjdGlvbjogXCJodHRwczovL3d3dy5tb2NreS5pby92Mi81Y2M4MDE5ZDMwMDAwMDk4MGEwNTVlNzZcIiwgYmVmb3JlVXBsb2FkOiBiZWZvcmVVcGxvYWQsIG9uQ2hhbmdlOiB0aGlzLmhhbmRsZUNoYW5nZSB9LCBpbWFnZVVybCA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIiwgeyBzcmM6IGltYWdlVXJsLCBhbHQ6IFwiYXZhdGFyXCIsIHN0eWxlOiB7IHdpZHRoOiAnMTAwJScgfSB9KSA6IHVwbG9hZEJ1dHRvbikpO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IFVwbG9hZENvbXBhbnlQaWN0dXJlO1xuIiwiaW1wb3J0IHsgZ3FsIH0gZnJvbSAnQGFwb2xsby9jbGllbnQnO1xuZXhwb3J0IGNvbnN0IG11dGF0aW9uQ3JlYXRlQ29tcGFueSA9IGdxbCBgXG5cdG11dGF0aW9uIENyZWF0ZUNvbXBhbnkoJGlucHV0OiBDb21wYW55SW5wdXQhKSB7XG5cdFx0Q3JlYXRlQ29tcGFueShpbnB1dDogJGlucHV0KSB7XG5cdFx0XHRpZFxuXHRcdH1cblx0fVxuYDtcbmV4cG9ydCBjb25zdCBtdXRhdGlvbkNyZWF0ZUpvYiA9IGdxbCBgXG5cdG11dGF0aW9uIENyZWF0ZUpvYigkaW5wdXQ6IEpvYklucHV0ISkge1xuXHRcdENyZWF0ZUpvYihpbnB1dDogJGlucHV0KSB7XG5cdFx0XHRpZFxuXHRcdH1cblx0fVxuYDtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBhbnQtZGVzaWduL2ljb25zXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBhcG9sbG8vY2xpZW50XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBhcG9sbG8vcmVhY3Qtc3NyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImFudGRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYW50ZC9saWIvaW5wdXQvU2VhcmNoXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJvZHktcGFyc2VyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvbXByZXNzaW9uXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImRvdGVudi9jb25maWdcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJoZWxtZXRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHBwXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImh0dHBcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibm9kZS1mZXRjaFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXRoXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LWRvbS9zZXJ2ZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3Qtcm91dGVyLWRvbVwiKTsiXSwic291cmNlUm9vdCI6IiJ9