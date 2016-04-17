System.register("forms_a2/common_renderer/renderer", ["forms_a2/common_renderer/layouts/VerticalLayoutRenderer", "forms_a2/common_renderer/layouts/HorizontalLayoutRenderer", "forms_a2/common_renderer/layouts/GroupLayoutRenderer", "forms_a2/common_renderer/controls/TextControlRenderer", "forms_a2/common_renderer/controls/NumberControlRenderer", "forms_a2/common_renderer/controls/IntegerControlRenderer", "forms_a2/common_renderer/controls/BooleanControlRenderer", "forms_a2/common_renderer/controls/EnumControlRenderer", "forms_a2/common_renderer/controls/ObjectControlRenderer", "forms_a2/common_renderer/controls/ObjectArrayControlRenderer", "forms_a2/common_renderer/controls/NumberArrayControlRenderer", "forms_a2/common_renderer/controls/AbstractControlRenderer", "forms_a2/common_renderer/controls/AbstractArrayControlRenderer", "forms_a2/common_renderer/controls/RefUriHelper", "forms_a2/common_renderer/PathUtil"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  function exportStar_1(m) {
    var exports = {};
    for (var n in m) {
      if (n !== "default")
        exports[n] = m[n];
    }
    exports_1(exports);
  }
  return {
    setters: [function(VerticalLayoutRenderer_1_1) {
      exportStar_1(VerticalLayoutRenderer_1_1);
    }, function(HorizontalLayoutRenderer_1_1) {
      exportStar_1(HorizontalLayoutRenderer_1_1);
    }, function(GroupLayoutRenderer_1_1) {
      exportStar_1(GroupLayoutRenderer_1_1);
    }, function(TextControlRenderer_1_1) {
      exportStar_1(TextControlRenderer_1_1);
    }, function(NumberControlRenderer_1_1) {
      exportStar_1(NumberControlRenderer_1_1);
    }, function(IntegerControlRenderer_1_1) {
      exportStar_1(IntegerControlRenderer_1_1);
    }, function(BooleanControlRenderer_1_1) {
      exportStar_1(BooleanControlRenderer_1_1);
    }, function(EnumControlRenderer_1_1) {
      exportStar_1(EnumControlRenderer_1_1);
    }, function(ObjectControlRenderer_1_1) {
      exportStar_1(ObjectControlRenderer_1_1);
    }, function(ObjectArrayControlRenderer_1_1) {
      exportStar_1(ObjectArrayControlRenderer_1_1);
    }, function(NumberArrayControlRenderer_1_1) {
      exportStar_1(NumberArrayControlRenderer_1_1);
    }, function(AbstractControlRenderer_1_1) {
      exportStar_1(AbstractControlRenderer_1_1);
    }, function(AbstractArrayControlRenderer_1_1) {
      exportStar_1(AbstractArrayControlRenderer_1_1);
    }, function(RefUriHelper_1_1) {
      exportStar_1(RefUriHelper_1_1);
    }, function(PathUtil_1_1) {
      exportStar_1(PathUtil_1_1);
    }],
    execute: function() {}
  };
});

System.register("forms_a2/common_services/RuleService", ["forms_a2/forms/forms", "forms_a2/common_renderer/PathUtil"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var forms_1,
      PathUtil_1;
  var RuleServiceFactory,
      RuleService;
  return {
    setters: [function(forms_1_1) {
      forms_1 = forms_1_1;
    }, function(PathUtil_1_1) {
      PathUtil_1 = PathUtil_1_1;
    }],
    execute: function() {
      RuleServiceFactory = (function() {
        function RuleServiceFactory() {}
        RuleServiceFactory.prototype.createFormService = function(dataSchema, uiSchema, data) {
          return new RuleService(dataSchema, uiSchema, data);
        };
        return RuleServiceFactory;
      }());
      exports_1("RuleServiceFactory", RuleServiceFactory);
      RuleService = (function(_super) {
        __extends(RuleService, _super);
        function RuleService(dataSchema, uiSchema, data) {
          _super.call(this, dataSchema, uiSchema, data);
          this.ruleUISchemaMap = [];
          this.findRules(uiSchema);
          this.checkRules(null);
        }
        RuleService.prototype.onChange = function(changeNotification) {
          this.checkRules(changeNotification);
        };
        RuleService.prototype.onAdd = function(changeNotification) {
          this.checkRules(changeNotification);
        };
        RuleService.prototype.onRemove = function(changeNotification) {
          this.checkRules(changeNotification);
        };
        RuleService.prototype.checkRules = function(changeNotification) {
          changeNotification == null ? this._data : changeNotification.newData(this._data), this._dataSchema;
          this.ruleUISchemaMap.forEach(function(entry) {
            var conditionPath = entry.rule.scope.$ref;
            var value = PathUtil_1.PathUtil.resolveInstanceFromPath(changeNotification, conditionPath);
            entry.uiSchema['visible'] = true;
            entry.uiSchema['enabled'] = true;
            if (entry.rule.type == 'show') {
              entry.uiSchema['visible'] = entry.rule.value == value;
            } else if (entry.rule.type == 'hide') {
              entry.uiSchema['visible'] = entry.rule.value != value;
            }
            if (entry.rule.type == 'enable') {
              entry.uiSchema['enabled'] = entry.rule.value == value;
            } else if (entry.rule.type == 'disable') {
              entry.uiSchema['enabled'] = entry.rule.value != value;
            }
          });
        };
        RuleService.prototype.findRules = function(fullSchema) {
          if (fullSchema.hasOwnProperty('elements')) {
            if (fullSchema.hasOwnProperty('rule')) {
              this.ruleUISchemaMap.push({
                rule: fullSchema['rule'],
                uiSchema: fullSchema
              });
            }
            var children = fullSchema['elements'];
            for (var i = 0; i < children.length; i++) {
              this.findRules(children[i]);
            }
          } else if (fullSchema.hasOwnProperty('scope')) {
            if (fullSchema.hasOwnProperty('rule')) {
              this.ruleUISchemaMap.push({
                rule: fullSchema['rule'],
                uiSchema: fullSchema
              });
            }
          }
        };
        RuleService.prototype.mapErrorOnControlObject = function(fullSchema, errors) {
          if (fullSchema.hasOwnProperty('elements')) {
            var children = fullSchema['elements'];
            for (var i = 0; i < children.length; i++) {
              this.mapErrorOnControlObject(children[i], errors);
            }
          } else if (fullSchema.hasOwnProperty('scope')) {
            var path_1 = PathUtil_1.PathUtil.normalize(fullSchema['scope']['$ref']);
            var keys = Object.keys(errors);
            var relevantKeys = keys.filter(function(value) {
              return value.indexOf(path_1) != -1 && value.substr(path_1.length + 1).indexOf("/") == -1;
            });
            if (relevantKeys.length == 0) {
              return;
            }
            var allErrors_1 = [];
            relevantKeys.forEach(function(key) {
              var indexOfSlash = key.indexOf("/");
              if (indexOfSlash == -1)
                allErrors_1.push(errors[key]);
              else {
                var position = key.substr(indexOfSlash + 1);
                allErrors_1.push({
                  "index": position,
                  "error": errors[key]
                });
              }
            });
            fullSchema['validation'] = allErrors_1;
          }
        };
        return RuleService;
      }(forms_1.FormsService));
    }
  };
});

System.register("forms_a2/forms/renderer_config_decorator", ["forms_a2/forms/renderer_config_impl", "angular2/src/core/util/decorators"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var renderer_config_impl_1,
      decorators_1;
  var RendererConfig;
  return {
    setters: [function(renderer_config_impl_1_1) {
      renderer_config_impl_1 = renderer_config_impl_1_1;
    }, function(decorators_1_1) {
      decorators_1 = decorators_1_1;
    }],
    execute: function() {
      exports_1("RendererConfig", RendererConfig = decorators_1.makeDecorator(renderer_config_impl_1.RendererConfig));
    }
  };
});

System.register("forms_a2/forms/service_config_impl", ["forms_a2/common_renderer/PathUtil"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var PathUtil_1;
  var FormsService,
      ChangeNotification;
  return {
    setters: [function(PathUtil_1_1) {
      PathUtil_1 = PathUtil_1_1;
    }],
    execute: function() {
      FormsService = (function() {
        function FormsService(_dataSchema, _uiSchema, _data) {
          this._dataSchema = _dataSchema;
          this._uiSchema = _uiSchema;
          this._data = _data;
        }
        ;
        return FormsService;
      }());
      exports_1("FormsService", FormsService);
      ChangeNotification = (function() {
        function ChangeNotification(_key, _previousValue, _currentValue) {
          this._key = _key;
          this._previousValue = _previousValue;
          this._currentValue = _currentValue;
        }
        Object.defineProperty(ChangeNotification.prototype, "schemaPath", {
          get: function() {
            return this._key;
          },
          enumerable: true,
          configurable: true
        });
        ChangeNotification.prototype.newData = function(oldData) {
          var clone = oldData == null ? {} : JSON.parse(JSON.stringify(oldData));
          var fragments = PathUtil_1.PathUtil.filterNonKeywords(PathUtil_1.PathUtil.toPropertyFragments(this._key));
          var fragment = fragments[fragments.length - 1];
          var fragmentsToObject = fragments.slice(0, fragments.length - 1);
          var modelValue = PathUtil_1.PathUtil.resolveInstanceFromFragments(oldData, fragmentsToObject);
          clone[fragment] = this._currentValue;
          return clone;
        };
        Object.defineProperty(ChangeNotification.prototype, "previousValue", {
          get: function() {
            return this._previousValue;
          },
          enumerable: true,
          configurable: true
        });
        Object.defineProperty(ChangeNotification.prototype, "currentValue", {
          get: function() {
            return this._currentValue;
          },
          enumerable: true,
          configurable: true
        });
        return ChangeNotification;
      }());
      exports_1("ChangeNotification", ChangeNotification);
    }
  };
});

System.register("forms_a2/forms/uischema_service/uischema_config_decorator", ["forms_a2/forms/uischema_service/uischema_config_impl", "angular2/src/core/util/decorators"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var uischema_config_impl_1,
      decorators_1;
  var UISchemaProviderConfig;
  return {
    setters: [function(uischema_config_impl_1_1) {
      uischema_config_impl_1 = uischema_config_impl_1_1;
    }, function(decorators_1_1) {
      decorators_1 = decorators_1_1;
    }],
    execute: function() {
      exports_1("UISchemaProviderConfig", UISchemaProviderConfig = decorators_1.makeDecorator(uischema_config_impl_1.UISchemaProviderConfig));
    }
  };
});

System.register("forms_a2/forms/renderer_config_impl", ["angular2/src/facade/lang"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var lang_1;
  var RendererConfig;
  return {
    setters: [function(lang_1_1) {
      lang_1 = lang_1_1;
    }],
    execute: function() {
      RendererConfig = (function() {
        function RendererConfig(configs) {
          this.configs = configs;
        }
        RendererConfig = __decorate([lang_1.CONST(), __metadata('design:paramtypes', [Array])], RendererConfig);
        return RendererConfig;
      }());
      exports_1("RendererConfig", RendererConfig);
    }
  };
});

System.register("forms_a2/forms/renderer_registry", ["angular2/core", "angular2/src/facade/lang", "angular2/src/core/reflection/reflection", "forms_a2/forms/renderer_config_impl"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var __param = (this && this.__param) || function(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  };
  var core_1,
      lang_1,
      reflection_1,
      renderer_config_impl_1;
  var FORM_DEFAULT_RENDERER,
      RendererRegistry;
  return {
    setters: [function(core_1_1) {
      core_1 = core_1_1;
    }, function(lang_1_1) {
      lang_1 = lang_1_1;
    }, function(reflection_1_1) {
      reflection_1 = reflection_1_1;
    }, function(renderer_config_impl_1_1) {
      renderer_config_impl_1 = renderer_config_impl_1_1;
    }],
    execute: function() {
      exports_1("FORM_DEFAULT_RENDERER", FORM_DEFAULT_RENDERER = lang_1.CONST_EXPR(new core_1.OpaqueToken('FormDefaultRenderer')));
      RendererRegistry = (function() {
        function RendererRegistry(_rootComponent, _defaultRenderer) {
          this._rootComponent = _rootComponent;
          this.renderer = _defaultRenderer;
          this.configFromComponent();
        }
        RendererRegistry.prototype.configFromComponent = function() {
          var _this = this;
          if (!lang_1.isType(this._rootComponent)) {
            return;
          }
          var annotations = reflection_1.reflector.annotations(this._rootComponent);
          if (lang_1.isPresent(annotations)) {
            for (var i = 0; i < annotations.length; i++) {
              var annotation = annotations[i];
              if (annotation instanceof renderer_config_impl_1.RendererConfig) {
                var rendererCfgs = annotation.configs;
                rendererCfgs.forEach(function(config) {
                  return _this.renderer.push(config);
                });
              }
            }
          }
        };
        RendererRegistry.prototype.register = function(rendererType, tester) {
          this.renderer.push({
            renderer: rendererType,
            tester: tester
          });
        };
        RendererRegistry.prototype.getBestComponent = function(element, dataSchema, dataObject) {
          var bestRenderer;
          var highestSpecificity = -1;
          for (var _i = 0,
              _a = this.renderer; _i < _a.length; _i++) {
            var rendererDef = _a[_i];
            var currentSpecificity = rendererDef.tester(element, dataSchema, dataObject);
            if (currentSpecificity > highestSpecificity) {
              highestSpecificity = currentSpecificity;
              bestRenderer = rendererDef.renderer;
            }
          }
          return bestRenderer;
        };
        RendererRegistry = __decorate([core_1.Injectable(), __param(0, core_1.Inject('FormPrimaryComponent')), __param(1, core_1.Inject(FORM_DEFAULT_RENDERER)), __metadata('design:paramtypes', [lang_1.Type, Array])], RendererRegistry);
        return RendererRegistry;
      }());
      exports_1("RendererRegistry", RendererRegistry);
    }
  };
});

System.register("forms_a2/forms/uischema_service/uischema_config_impl", ["angular2/src/facade/lang"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var lang_1;
  var UISchemaProviderConfig;
  return {
    setters: [function(lang_1_1) {
      lang_1 = lang_1_1;
    }],
    execute: function() {
      UISchemaProviderConfig = (function() {
        function UISchemaProviderConfig(configs) {
          this.configs = configs;
        }
        UISchemaProviderConfig = __decorate([lang_1.CONST(), __metadata('design:paramtypes', [Array])], UISchemaProviderConfig);
        return UISchemaProviderConfig;
      }());
      exports_1("UISchemaProviderConfig", UISchemaProviderConfig);
    }
  };
});

System.register("forms_a2/forms/uischema_service/ViewGenerator", [], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var ViewGenerator;
  return {
    setters: [],
    execute: function() {
      ViewGenerator = (function() {
        function ViewGenerator() {}
        ViewGenerator.generate = function(schema, prefixPath) {
          var _this = this;
          if (prefixPath === void 0) {
            prefixPath = "/";
          }
          var subUiSchema = {
            type: 'VerticalLayout',
            elements: []
          };
          if (schema.allOf != undefined) {
            schema.allOf.forEach(function(element, index) {
              subUiSchema.elements.push(_this.generate(element, prefixPath + "allOf/" + index + "/"));
            });
            return subUiSchema;
          }
          if (schema.anyOf != undefined) {
            schema.anyOf.forEach(function(element, index) {
              subUiSchema.elements.push(_this.generate(element, prefixPath + "anyOf/" + index + "/"));
            });
            return subUiSchema;
          }
          if (schema.oneOf != undefined) {
            schema.oneOf.forEach(function(element, index) {
              subUiSchema.elements.push(_this.generate(element, prefixPath + "oneOf/" + index + "/"));
            });
            subUiSchema.type = "HorizontalLayout";
            return subUiSchema;
          }
          Object.keys(schema.properties).forEach(function(key) {
            var control = {
              type: "Control",
              label: key,
              scope: {$ref: prefixPath + "properties/" + key}
            };
            subUiSchema.elements.push(control);
          });
          return subUiSchema;
        };
        return ViewGenerator;
      }());
      exports_1("ViewGenerator", ViewGenerator);
    }
  };
});

System.register("forms_a2/forms/uischema_service/uischema_registry", ["angular2/core", "angular2/src/facade/lang", "angular2/src/core/reflection/reflection", "forms_a2/forms/uischema_service/uischema_config_impl", "forms_a2/forms/uischema_service/ViewGenerator"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var __param = (this && this.__param) || function(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  };
  var core_1,
      lang_1,
      reflection_1,
      uischema_config_impl_1,
      ViewGenerator_1;
  var UISchemaProviderService;
  return {
    setters: [function(core_1_1) {
      core_1 = core_1_1;
    }, function(lang_1_1) {
      lang_1 = lang_1_1;
    }, function(reflection_1_1) {
      reflection_1 = reflection_1_1;
    }, function(uischema_config_impl_1_1) {
      uischema_config_impl_1 = uischema_config_impl_1_1;
    }, function(ViewGenerator_1_1) {
      ViewGenerator_1 = ViewGenerator_1_1;
    }],
    execute: function() {
      UISchemaProviderService = (function() {
        function UISchemaProviderService(_rootComponent) {
          this._rootComponent = _rootComponent;
          this.uiSchemaProviders = [];
          this.configFromComponent();
        }
        UISchemaProviderService.prototype.configFromComponent = function() {
          var _this = this;
          if (!lang_1.isType(this._rootComponent)) {
            return;
          }
          var annotations = reflection_1.reflector.annotations(this._rootComponent);
          if (lang_1.isPresent(annotations)) {
            for (var i = 0; i < annotations.length; i++) {
              var annotation = annotations[i];
              if (annotation instanceof uischema_config_impl_1.UISchemaProviderConfig) {
                var uischemaCfgs = annotation.configs;
                uischemaCfgs.forEach(function(config) {
                  return _this.uiSchemaProviders.push(config);
                });
              }
            }
          }
        };
        UISchemaProviderService.prototype.register = function(uischemaElement, tester) {
          this.uiSchemaProviders.push({
            uischemaElement: uischemaElement,
            tester: tester
          });
        };
        UISchemaProviderService.prototype.getBestComponent = function(dataSchema, uiSchemaParameter) {
          var bestUISchema;
          var highestSpecificity = -1;
          for (var _i = 0,
              _a = this.uiSchemaProviders; _i < _a.length; _i++) {
            var uiSchemaProvider = _a[_i];
            var currentSpecificity = uiSchemaProvider.tester(dataSchema, uiSchemaParameter);
            if (currentSpecificity > highestSpecificity) {
              highestSpecificity = currentSpecificity;
              bestUISchema = uiSchemaProvider.uischemaElement;
            }
          }
          if (bestUISchema != null)
            return JSON.parse(JSON.stringify(bestUISchema));
          return ViewGenerator_1.ViewGenerator.generate(dataSchema);
        };
        UISchemaProviderService = __decorate([core_1.Injectable(), __param(0, core_1.Inject('FormPrimaryComponent')), __metadata('design:paramtypes', [lang_1.Type])], UISchemaProviderService);
        return UISchemaProviderService;
      }());
      exports_1("UISchemaProviderService", UISchemaProviderService);
    }
  };
});

System.register("forms_a2/forms/form_outlet", ["angular2/core", "forms_a2/forms/forms"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var __param = (this && this.__param) || function(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  };
  var core_1,
      forms_1;
  var FormOutlet;
  return {
    setters: [function(core_1_1) {
      core_1 = core_1_1;
    }, function(forms_1_1) {
      forms_1 = forms_1_1;
    }],
    execute: function() {
      FormOutlet = (function() {
        function FormOutlet(_elementRef, _rendererRegistry, _loader, _keyValueDifferFactory, _iterableDifferFactory, _uiSchemaProvider, _serviceFactories, _oldUiSchema, _oldDataSchema, _oldData, _oldUiSchemaRefs) {
          this._elementRef = _elementRef;
          this._rendererRegistry = _rendererRegistry;
          this._loader = _loader;
          this._keyValueDifferFactory = _keyValueDifferFactory;
          this._iterableDifferFactory = _iterableDifferFactory;
          this._uiSchemaProvider = _uiSchemaProvider;
          this._serviceFactories = _serviceFactories;
          this._oldUiSchema = _oldUiSchema;
          this._oldDataSchema = _oldDataSchema;
          this._oldData = _oldData;
          this._oldUiSchemaRefs = _oldUiSchemaRefs;
          this._iterableDiffer = {};
          this._initialized = false;
          this._services = [];
          this._root = false;
        }
        FormOutlet.prototype.ngOnInit = function() {
          var _this = this;
          if (this._dataSchema != null) {
            JsonRefs.resolveRefs(this._dataSchema).then(function(res) {
              _this._dataSchema = res.resolved;
              if (Object.keys(res.refs).length != 0)
                _this._refs = res.refs;
              if (_this._root) {
                _this.initRoot();
              }
              _this.render();
            }, function(err) {
              console.log(err.stack);
            });
          } else {
            this._dataSchema = this._oldDataSchema;
            if (this._root) {
              this.initRoot();
            }
            this.render();
          }
        };
        FormOutlet.prototype.initRoot = function() {
          var _this = this;
          if (this._uiSchema == null) {
            this._uiSchema = this._uiSchemaProvider.getBestComponent(this._dataSchema, this._uiSchemaParameter);
          }
          this._serviceFactories.forEach(function(serviceFactory) {
            _this._services.push(serviceFactory.createFormService(_this._dataSchema, _this._uiSchema, _this._data));
          });
          this._keyValueDiffer = this._keyValueDifferFactory.find({}).create(null);
          var properties = this._dataSchema.properties;
          if (properties != null)
            Object.keys(properties).forEach(function(key) {
              var property = properties[key];
              if (property.type == 'array') {
                var differ = _this._iterableDifferFactory.find([]).create(null);
                _this._iterableDiffer[key] = differ;
              }
            });
        };
        FormOutlet.prototype.render = function() {
          var _this = this;
          if (this._renderedChild != null)
            this._renderedChild.dispose();
          if (this._uiSchema == null)
            this._uiSchema = this._oldUiSchema;
          if (this._data == null)
            this._data = this._oldData;
          if (this._oldUiSchemaRefs != null)
            this._refs = this._oldUiSchemaRefs;
          if (this._data == null)
            return;
          var curcomponent = this._rendererRegistry.getBestComponent(this._uiSchema, this._dataSchema, this._data);
          if (curcomponent) {
            var toResolve = [core_1.provide('uiSchema', {useValue: this._uiSchema}), core_1.provide('data', {useValue: this._data}), core_1.provide('dataSchema', {useValue: this._dataSchema}), core_1.provide('uiSchemaRefs', {useValue: this._refs})];
            if (this._uiSchemaParameter != undefined) {
              toResolve.push(core_1.provide('uiSchemaParameter', {useValue: this._uiSchemaParameter}));
            }
            var promise = this._loader.loadNextToLocation(curcomponent, this._elementRef, core_1.Injector.resolve(toResolve));
            promise.then(function(result) {
              _this._renderedChild = result;
            });
          } else {
            console.log(JSON.stringify(this._uiSchema));
            console.log(JSON.stringify(this._dataSchema));
          }
        };
        FormOutlet.prototype.ngDoCheck = function() {
          var _this = this;
          if (!this._initialized || !this._root)
            return;
          var keyValueChanges = this._keyValueDiffer.diff(this._data);
          if (keyValueChanges) {
            keyValueChanges.forEachAddedItem(function(r) {
              _this._services.forEach(function(service) {
                return service.onAdd(new forms_1.ChangeNotification(r.key, r.previousValue, r.currentValue));
              });
            });
            keyValueChanges.forEachRemovedItem(function(r) {
              _this._services.forEach(function(service) {
                return service.onRemove(new forms_1.ChangeNotification(r.key, r.previousValue, r.currentValue));
              });
            });
            keyValueChanges.forEachChangedItem(function(r) {
              _this._services.forEach(function(service) {
                return service.onChange(new forms_1.ChangeNotification(r.key, r.previousValue, r.currentValue));
              });
            });
          }
          Object.keys(this._iterableDiffer).forEach(function(key) {
            var iterableChanges = _this._iterableDiffer[key].diff(_this._data[key]);
            if (iterableChanges) {
              iterableChanges.forEachAddedItem(function(r) {
                _this._services.forEach(function(service) {
                  return service.onAdd(new forms_1.ChangeNotification(r.key, r.previousValue, r.currentValue));
                });
              });
              iterableChanges.forEachRemovedItem(function(r) {
                _this._services.forEach(function(service) {
                  return service.onRemove(new forms_1.ChangeNotification(r.key, r.previousValue, r.currentValue));
                });
              });
              iterableChanges.forEachIdentityChange(function(r) {
                _this._services.forEach(function(service) {
                  return service.onChange(new forms_1.ChangeNotification(r.key, r.previousValue, r.currentValue));
                });
              });
              iterableChanges.forEachMovedItem(function(r) {
                _this._services.forEach(function(service) {
                  return service.onChange(new forms_1.ChangeNotification(r.key, r.previousValue, r.currentValue));
                });
              });
            }
          });
        };
        FormOutlet.prototype.ngAfterContentInit = function() {
          this._initialized = true;
        };
        FormOutlet.prototype.ngOnChanges = function() {
          if (!this._initialized || !this._root)
            return;
          this.render();
        };
        __decorate([core_1.Input("uiSchema"), __metadata('design:type', Object)], FormOutlet.prototype, "_uiSchema", void 0);
        __decorate([core_1.Input("data"), __metadata('design:type', Object)], FormOutlet.prototype, "_data", void 0);
        __decorate([core_1.Input("dataSchema"), __metadata('design:type', Object)], FormOutlet.prototype, "_dataSchema", void 0);
        __decorate([core_1.Input("uiSchemaParameter"), __metadata('design:type', Object)], FormOutlet.prototype, "_uiSchemaParameter", void 0);
        __decorate([core_1.Input("root"), __metadata('design:type', Boolean)], FormOutlet.prototype, "_root", void 0);
        __decorate([core_1.Input("refs"), __metadata('design:type', Object)], FormOutlet.prototype, "_refs", void 0);
        FormOutlet = __decorate([core_1.Directive({selector: 'form-outlet'}), __param(6, core_1.Inject('FormServiceFactories')), __param(7, core_1.Optional()), __param(7, core_1.Inject('uiSchema')), __param(8, core_1.Optional()), __param(8, core_1.Inject('dataSchema')), __param(9, core_1.Optional()), __param(9, core_1.Inject('data')), __param(10, core_1.Optional()), __param(10, core_1.Inject('uiSchemaRefs')), __metadata('design:paramtypes', [core_1.ElementRef, forms_1.RendererRegistry, core_1.DynamicComponentLoader, core_1.KeyValueDiffers, core_1.IterableDiffers, forms_1.UISchemaProviderService, Array, Object, Object, Object, Object])], FormOutlet);
        return FormOutlet;
      }());
      exports_1("FormOutlet", FormOutlet);
    }
  };
});

System.register("forms_a2/common_renderer/layouts/VerticalLayoutRenderer", ["angular2/core", "forms_a2/forms/forms"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var __param = (this && this.__param) || function(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  };
  var core_1,
      forms_1;
  var VerticalLayoutRenderer,
      VerticalLayoutRendererTester;
  return {
    setters: [function(core_1_1) {
      core_1 = core_1_1;
    }, function(forms_1_1) {
      forms_1 = forms_1_1;
    }],
    execute: function() {
      VerticalLayoutRenderer = (function() {
        function VerticalLayoutRenderer(_uiSchema) {
          this._uiSchema = _uiSchema;
        }
        VerticalLayoutRenderer.prototype.ngOnInit = function() {};
        VerticalLayoutRenderer = __decorate([core_1.Component({
          selector: 'VerticalLayoutRenderer',
          template: "<div class=\"forms_verticalLayout forms_layout\"><form-outlet *ngFor=\"#subUiSchema of _uiSchema.elements\" [uiSchema]=\"subUiSchema\"></form-outlet></div>",
          styles: [""],
          directives: [forms_1.FormOutlet]
        }), __param(0, core_1.Inject('uiSchema')), __metadata('design:paramtypes', [Object])], VerticalLayoutRenderer);
        return VerticalLayoutRenderer;
      }());
      exports_1("VerticalLayoutRenderer", VerticalLayoutRenderer);
      exports_1("VerticalLayoutRendererTester", VerticalLayoutRendererTester = function(element, dataSchema, dataObject) {
        if ('VerticalLayout' == element.type) {
          return 2;
        }
        return forms_1.NOT_FITTING;
      });
    }
  };
});

System.register("forms_a2/common_renderer/layouts/HorizontalLayoutRenderer", ["angular2/core", "forms_a2/forms/forms"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var __param = (this && this.__param) || function(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  };
  var core_1,
      forms_1;
  var HorizontalLayoutRenderer,
      HorizontalLayoutRendererTester;
  return {
    setters: [function(core_1_1) {
      core_1 = core_1_1;
    }, function(forms_1_1) {
      forms_1 = forms_1_1;
    }],
    execute: function() {
      HorizontalLayoutRenderer = (function() {
        function HorizontalLayoutRenderer(_uiSchema) {
          this._uiSchema = _uiSchema;
        }
        HorizontalLayoutRenderer.prototype.ngOnInit = function() {};
        HorizontalLayoutRenderer = __decorate([core_1.Component({
          selector: 'HorizontalLayoutRenderer',
          template: "<div class=\"forms_horizontalLayout forms_layout\"><form-outlet *ngFor=\"#subUiSchema of _uiSchema.elements\" [uiSchema]=\"subUiSchema\"></form-outlet></div>",
          styles: [".forms_horizontalLayout {display: flex;justify-content: flex-start;}"],
          directives: [forms_1.FormOutlet]
        }), __param(0, core_1.Inject('uiSchema')), __metadata('design:paramtypes', [Object])], HorizontalLayoutRenderer);
        return HorizontalLayoutRenderer;
      }());
      exports_1("HorizontalLayoutRenderer", HorizontalLayoutRenderer);
      exports_1("HorizontalLayoutRendererTester", HorizontalLayoutRendererTester = function(element, dataSchema, dataObject) {
        if ('HorizontalLayout' == element.type) {
          return 2;
        }
        return forms_1.NOT_FITTING;
      });
    }
  };
});

System.register("forms_a2/common_renderer/layouts/GroupLayoutRenderer", ["angular2/core", "forms_a2/forms/forms"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var __param = (this && this.__param) || function(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  };
  var core_1,
      forms_1;
  var GroupLayoutRenderer,
      GroupLayoutRendererTester;
  return {
    setters: [function(core_1_1) {
      core_1 = core_1_1;
    }, function(forms_1_1) {
      forms_1 = forms_1_1;
    }],
    execute: function() {
      GroupLayoutRenderer = (function() {
        function GroupLayoutRenderer(_uiSchema) {
          this._uiSchema = _uiSchema;
        }
        GroupLayoutRenderer.prototype.ngOnInit = function() {};
        GroupLayoutRenderer = __decorate([core_1.Component({
          selector: 'GroupLayoutRenderer',
          template: "<fieldset class=\"forms_groupLayout forms_layout\"><legend class=\"forms_groupLabel\">{{_uiSchema.label}}</legend><form-outlet *ngFor=\"#subUiSchema of _uiSchema.elements\" [uiSchema]=\"subUiSchema\"></form-outlet></fieldset>",
          styles: [".forms_groupLabel {padding-left:1em;padding-right:1em;}"],
          directives: [forms_1.FormOutlet]
        }), __param(0, core_1.Inject('uiSchema')), __metadata('design:paramtypes', [Object])], GroupLayoutRenderer);
        return GroupLayoutRenderer;
      }());
      exports_1("GroupLayoutRenderer", GroupLayoutRenderer);
      exports_1("GroupLayoutRendererTester", GroupLayoutRendererTester = function(element, dataSchema, dataObject) {
        if ('GroupLayout' == element.type) {
          return 2;
        }
        return forms_1.NOT_FITTING;
      });
    }
  };
});

System.register("forms_a2/common_renderer/controls/TextControlRenderer", ["angular2/core", "forms_a2/common_renderer/controls/AbstractControlRenderer"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var __param = (this && this.__param) || function(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  };
  var core_1,
      AbstractControlRenderer_1;
  var TextControlRenderer,
      TextControlRendererTester;
  return {
    setters: [function(core_1_1) {
      core_1 = core_1_1;
    }, function(AbstractControlRenderer_1_1) {
      AbstractControlRenderer_1 = AbstractControlRenderer_1_1;
    }],
    execute: function() {
      TextControlRenderer = (function(_super) {
        __extends(TextControlRenderer, _super);
        function TextControlRenderer(_uiSchema, _data) {
          _super.call(this, _uiSchema, _data);
        }
        TextControlRenderer = __decorate([core_1.Component({
          selector: 'TextControlRenderer',
          template: "\n        <div class=\"forms_control\">\n            <label class=\"forms_textControlLabel forms_controlLabel\">{{label}}</label>\n            <input type=\"text\" [(ngModel)]=\"_modelValue[fragment]\" class=\"forms_textControl forms_controlInput\"/>\n            <div *ngFor=\"#error of getErrors(_uiSchema.validation)\" class=\"forms_controlValidation\">{{error|json}}</div>\n        </div>\n    ",
          styles: [""],
          directives: [],
          changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), __param(0, core_1.Inject('uiSchema')), __param(1, core_1.Inject('data')), __metadata('design:paramtypes', [Object, Object])], TextControlRenderer);
        return TextControlRenderer;
      }(AbstractControlRenderer_1.AbstractControlRenderer));
      exports_1("TextControlRenderer", TextControlRenderer);
      exports_1("TextControlRendererTester", TextControlRendererTester = AbstractControlRenderer_1.ControlRendererTester('string', 1));
    }
  };
});

System.register("forms_a2/common_renderer/controls/NumberControlRenderer", ["angular2/core", "forms_a2/common_renderer/controls/AbstractControlRenderer"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var __param = (this && this.__param) || function(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  };
  var core_1,
      AbstractControlRenderer_1;
  var NumberControlRenderer,
      NumberControlRendererTester;
  return {
    setters: [function(core_1_1) {
      core_1 = core_1_1;
    }, function(AbstractControlRenderer_1_1) {
      AbstractControlRenderer_1 = AbstractControlRenderer_1_1;
    }],
    execute: function() {
      NumberControlRenderer = (function(_super) {
        __extends(NumberControlRenderer, _super);
        function NumberControlRenderer(_uiSchema, _data) {
          _super.call(this, _uiSchema, _data);
        }
        NumberControlRenderer = __decorate([core_1.Component({
          selector: 'NumberControlRenderer',
          template: "\n        <div class=\"forms_control\">\n            <label class=\"forms_numberControlLabel forms_controlLabel\">{{label}}</label>\n            <input type=\"number\" step=\"0.01\" [(ngModel)]=\"_modelValue[fragment]\" class=\"forms_numberControl forms_controlInput\"/>\n            <div *ngFor=\"#error of getErrors(_uiSchema.validation)\" class=\"forms_controlValidation\">{{error|json}}</div>\n        </div>\n    ",
          styles: [""],
          directives: [],
          changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), __param(0, core_1.Inject('uiSchema')), __param(1, core_1.Inject('data')), __metadata('design:paramtypes', [Object, Object])], NumberControlRenderer);
        return NumberControlRenderer;
      }(AbstractControlRenderer_1.AbstractControlRenderer));
      exports_1("NumberControlRenderer", NumberControlRenderer);
      exports_1("NumberControlRendererTester", NumberControlRendererTester = AbstractControlRenderer_1.ControlRendererTester('number', 1));
    }
  };
});

System.register("forms_a2/common_renderer/controls/IntegerControlRenderer", ["angular2/core", "forms_a2/common_renderer/controls/AbstractControlRenderer"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var __param = (this && this.__param) || function(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  };
  var core_1,
      AbstractControlRenderer_1;
  var IntegerControlRenderer,
      IntegerControlRendererTester;
  return {
    setters: [function(core_1_1) {
      core_1 = core_1_1;
    }, function(AbstractControlRenderer_1_1) {
      AbstractControlRenderer_1 = AbstractControlRenderer_1_1;
    }],
    execute: function() {
      IntegerControlRenderer = (function(_super) {
        __extends(IntegerControlRenderer, _super);
        function IntegerControlRenderer(_uiSchema, _data) {
          _super.call(this, _uiSchema, _data);
        }
        IntegerControlRenderer = __decorate([core_1.Component({
          selector: 'IntegerControlRenderer',
          template: "\n        <div class=\"forms_control\">\n            <label class=\"forms_integerControlLabel forms_controlLabel\">{{label}}</label>\n            <input type=\"number\" step=\"1\" [(ngModel)]=\"_modelValue[fragment]\" class=\"forms_integerControl forms_controlInput\"/>\n            <div *ngFor=\"#error of getErrors(_uiSchema.validation)\" class=\"forms_controlValidation\">{{error|json}}</div>\n        </div>\n    ",
          styles: [""],
          directives: [],
          changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), __param(0, core_1.Inject('uiSchema')), __param(1, core_1.Inject('data')), __metadata('design:paramtypes', [Object, Object])], IntegerControlRenderer);
        return IntegerControlRenderer;
      }(AbstractControlRenderer_1.AbstractControlRenderer));
      exports_1("IntegerControlRenderer", IntegerControlRenderer);
      exports_1("IntegerControlRendererTester", IntegerControlRendererTester = AbstractControlRenderer_1.ControlRendererTester('integer', 1));
    }
  };
});

System.register("forms_a2/common_renderer/controls/BooleanControlRenderer", ["angular2/core", "forms_a2/common_renderer/controls/AbstractControlRenderer"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var __param = (this && this.__param) || function(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  };
  var core_1,
      AbstractControlRenderer_1;
  var BooleanControlRenderer,
      BooleanControlRendererTester;
  return {
    setters: [function(core_1_1) {
      core_1 = core_1_1;
    }, function(AbstractControlRenderer_1_1) {
      AbstractControlRenderer_1 = AbstractControlRenderer_1_1;
    }],
    execute: function() {
      BooleanControlRenderer = (function(_super) {
        __extends(BooleanControlRenderer, _super);
        function BooleanControlRenderer(_uiSchema, _data) {
          _super.call(this, _uiSchema, _data);
        }
        BooleanControlRenderer = __decorate([core_1.Component({
          selector: 'BooleanControlRenderer',
          template: "\n        <div class=\"forms_control\">\n            <label class=\"forms_booleanControlLabel forms_controlLabel\">{{label}}</label>\n            <input type=\"checkbox\" [(ngModel)]=\"_modelValue[fragment]\" class=\"forms_booleanControl forms_controlInput\"/>\n            <div *ngFor=\"#error of getErrors(_uiSchema.validation)\" class=\"forms_controlValidation\">{{error|json}}</div>\n        </div>\n    ",
          styles: [""],
          directives: [],
          changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), __param(0, core_1.Inject('uiSchema')), __param(1, core_1.Inject('data')), __metadata('design:paramtypes', [Object, Object])], BooleanControlRenderer);
        return BooleanControlRenderer;
      }(AbstractControlRenderer_1.AbstractControlRenderer));
      exports_1("BooleanControlRenderer", BooleanControlRenderer);
      exports_1("BooleanControlRendererTester", BooleanControlRendererTester = AbstractControlRenderer_1.ControlRendererTester('boolean', 1));
    }
  };
});

System.register("forms_a2/common_renderer/controls/EnumControlRenderer", ["angular2/core", "forms_a2/forms/forms", "forms_a2/common_renderer/controls/AbstractControlRenderer", "forms_a2/common_renderer/PathUtil"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var __param = (this && this.__param) || function(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  };
  var core_1,
      forms_1,
      AbstractControlRenderer_1,
      PathUtil_1;
  var EnumControlRenderer,
      EnumControlRendererTester;
  return {
    setters: [function(core_1_1) {
      core_1 = core_1_1;
    }, function(forms_1_1) {
      forms_1 = forms_1_1;
    }, function(AbstractControlRenderer_1_1) {
      AbstractControlRenderer_1 = AbstractControlRenderer_1_1;
    }, function(PathUtil_1_1) {
      PathUtil_1 = PathUtil_1_1;
    }],
    execute: function() {
      EnumControlRenderer = (function(_super) {
        __extends(EnumControlRenderer, _super);
        function EnumControlRenderer(_uiSchema, _data, _dataSchema) {
          _super.call(this, _uiSchema, _data);
          this._subSchema = PathUtil_1.PathUtil.resolveSchema(_dataSchema, _uiSchema['scope']['$ref']);
        }
        Object.defineProperty(EnumControlRenderer.prototype, "options", {
          get: function() {
            if (this._subSchema.hasOwnProperty('enum'))
              return this._subSchema.enum;
            if (this._subSchema.allOf != undefined) {
              return this._subSchema.allOf.reduce(function(prev, element) {
                return prev.concat(element.enum);
              }, []);
            }
            if (this._subSchema.anyOf != undefined) {
              return this._subSchema.anyOf.reduce(function(prev, element) {
                if (element.hasOwnProperty('enum'))
                  return prev.concat(element.enum);
                return prev;
              }, []);
            }
            return [];
          },
          enumerable: true,
          configurable: true
        });
        EnumControlRenderer = __decorate([core_1.Component({
          selector: 'EnumControlRenderer',
          template: "\n        <div class=\"forms_control\">\n            <label class=\"forms_enumControlLabel forms_controlLabel\">{{label}}</label>\n            <select class=\"forms_enumControl forms_controlInput\" [(ngModel)]=\"_modelValue[fragment]\">\n                <option *ngFor=\"#option of options\" [value]=\"option\">{{option}}</option>\n            </select>\n            <div *ngFor=\"#error of getErrors(_uiSchema.validation)\" class=\"forms_controlValidation\">{{error|json}}</div>\n        </div>\n    ",
          styles: [""],
          directives: [],
          changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), __param(0, core_1.Inject('uiSchema')), __param(1, core_1.Inject('data')), __param(2, core_1.Inject('dataSchema')), __metadata('design:paramtypes', [Object, Object, Object])], EnumControlRenderer);
        return EnumControlRenderer;
      }(AbstractControlRenderer_1.AbstractControlRenderer));
      exports_1("EnumControlRenderer", EnumControlRenderer);
      exports_1("EnumControlRendererTester", EnumControlRendererTester = function(element, dataSchema, dataObject) {
        if (element.type != 'Control')
          return forms_1.NOT_FITTING;
        var currentDataSchema = PathUtil_1.PathUtil.resolveSchema(dataSchema, element['scope']['$ref']);
        if ((!currentDataSchema.hasOwnProperty('enum')) && (currentDataSchema.allOf == undefined || currentDataSchema.allOf.every(function(element) {
          return !element.hasOwnProperty('enum');
        })) && (currentDataSchema.anyOf == undefined || !currentDataSchema.anyOf.some(function(element) {
          return element.hasOwnProperty('enum');
        })))
          return forms_1.NOT_FITTING;
        return 2;
      });
    }
  };
});

System.register("forms_a2/common_renderer/controls/ObjectControlRenderer", ["angular2/core", "forms_a2/forms/forms", "forms_a2/common_renderer/controls/AbstractControlRenderer", "forms_a2/common_renderer/PathUtil", "forms_a2/common_renderer/controls/RefUriHelper"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var __param = (this && this.__param) || function(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  };
  var core_1,
      forms_1,
      AbstractControlRenderer_1,
      PathUtil_1,
      RefUriHelper_1;
  var ObjectControlRenderer,
      ObjectControlRendererTester;
  return {
    setters: [function(core_1_1) {
      core_1 = core_1_1;
    }, function(forms_1_1) {
      forms_1 = forms_1_1;
    }, function(AbstractControlRenderer_1_1) {
      AbstractControlRenderer_1 = AbstractControlRenderer_1_1;
    }, function(PathUtil_1_1) {
      PathUtil_1 = PathUtil_1_1;
    }, function(RefUriHelper_1_1) {
      RefUriHelper_1 = RefUriHelper_1_1;
    }],
    execute: function() {
      ObjectControlRenderer = (function(_super) {
        __extends(ObjectControlRenderer, _super);
        function ObjectControlRenderer(_uiSchema, _data, _dataSchema, _uiSchemaRefs, _parentUISchemaParameter) {
          _super.call(this, _uiSchema, _data);
          this._dataSchema = _dataSchema;
          this._uiSchemaRefs = _uiSchemaRefs;
          this._parentUISchemaParameter = _parentUISchemaParameter;
          if (this._parentUISchemaParameter == undefined)
            this._parentUISchemaParameter = {
              refUri: "",
              property: ""
            };
        }
        ObjectControlRenderer.prototype.ngOnInit = function() {
          this._subSchema = PathUtil_1.PathUtil.resolveSchema(this._dataSchema, this._uiSchema['scope']['$ref']);
          if (this._uiSchemaRefs != null) {
            this._uiSchemaParameter = {
              refUri: RefUriHelper_1.RefUriHelper.getRefUri(this._parentUISchemaParameter, this._uiSchema['scope']['$ref'], this._uiSchemaRefs),
              property: this.fragment
            };
          }
        };
        ObjectControlRenderer.prototype.createInstance = function() {
          this._modelValue[this.fragment] = {};
        };
        ObjectControlRenderer = __decorate([core_1.Component({
          selector: 'ObjectControlRenderer',
          template: "\n        <div class=\"forms_control\">\n            <label class=\"forms_objectControlLabel forms_controlLabel\">{{label}}</label>\n            <button (click)=\"createInstance()\" *ngIf=\"!_modelValue[fragment]\" class=\"forms_controlInput\">Create {{label}}</button>\n            <fieldset *ngIf=\"_modelValue[fragment]\">\n                <form-outlet [data]=\"_modelValue[fragment]\" [dataSchema]=\"_subSchema\" [uiSchemaParameter]=\"_uiSchemaParameter\" [root]=\"true\"></form-outlet>\n            </fieldset>\n            <div *ngFor=\"#error of getErrors(_uiSchema.validation)\" class=\"forms_controlValidation\">{{error|json}}</div>\n        </div>\n    ",
          styles: [""],
          directives: [forms_1.FormOutlet]
        }), __param(0, core_1.Inject('uiSchema')), __param(1, core_1.Inject('data')), __param(2, core_1.Inject('dataSchema')), __param(3, core_1.Inject('uiSchemaRefs')), __param(4, core_1.Optional()), __param(4, core_1.Inject('uiSchemaParameter')), __metadata('design:paramtypes', [Object, Object, Object, Object, Object])], ObjectControlRenderer);
        return ObjectControlRenderer;
      }(AbstractControlRenderer_1.AbstractControlRenderer));
      exports_1("ObjectControlRenderer", ObjectControlRenderer);
      exports_1("ObjectControlRendererTester", ObjectControlRendererTester = AbstractControlRenderer_1.ControlRendererTester('object', 1));
    }
  };
});

System.register("forms_a2/common_renderer/controls/RefUriHelper", [], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var RefUriHelper;
  return {
    setters: [],
    execute: function() {
      RefUriHelper = (function() {
        function RefUriHelper() {}
        RefUriHelper.getRefUri = function(parentUISchemaParameter, controlPath, schemaRefs) {
          var searchKeys = [];
          var indexOfProperties = controlPath.indexOf("properties");
          searchKeys.push(controlPath.substr(indexOfProperties));
          var lastIndexOfAllOf = controlPath.lastIndexOf("allOf");
          searchKeys.push(controlPath.substr(lastIndexOfAllOf));
          searchKeys.push(parentUISchemaParameter.refUri + controlPath);
          var foundKeys = Object.keys(schemaRefs).filter(function(key) {
            return searchKeys.some(function(searchKey) {
              return key.indexOf(searchKey) != -1;
            });
          });
          if (foundKeys == null || foundKeys.length == 0)
            return undefined;
          var resolvedRefs = foundKeys.map(function(key) {
            return {
              ref: schemaRefs[key],
              prio: (key.indexOf(searchKeys[0]) != -1 ? 1 : 0) + (key.indexOf(searchKeys[1]) != -1 ? 2 : 0) + (key.indexOf(searchKeys[2]) != -1 ? 4 : 0)
            };
          });
          var resolvedRef = resolvedRefs.reduce(function(prev, cur) {
            if (prev.prio > cur.prio)
              return prev;
            return cur;
          });
          if (resolvedRef != null)
            return resolvedRef.ref.uri;
        };
        return RefUriHelper;
      }());
      exports_1("RefUriHelper", RefUriHelper);
    }
  };
});

System.register("forms_a2/common_renderer/controls/ObjectArrayControlRenderer", ["angular2/core", "forms_a2/forms/forms", "forms_a2/common_renderer/controls/AbstractArrayControlRenderer", "forms_a2/common_renderer/PathUtil", "forms_a2/common_renderer/controls/RefUriHelper"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var __param = (this && this.__param) || function(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  };
  var core_1,
      forms_1,
      AbstractArrayControlRenderer_1,
      PathUtil_1,
      RefUriHelper_1;
  var ObjectArrayControlRenderer,
      ObjectArrayControlRendererTester;
  return {
    setters: [function(core_1_1) {
      core_1 = core_1_1;
    }, function(forms_1_1) {
      forms_1 = forms_1_1;
    }, function(AbstractArrayControlRenderer_1_1) {
      AbstractArrayControlRenderer_1 = AbstractArrayControlRenderer_1_1;
    }, function(PathUtil_1_1) {
      PathUtil_1 = PathUtil_1_1;
    }, function(RefUriHelper_1_1) {
      RefUriHelper_1 = RefUriHelper_1_1;
    }],
    execute: function() {
      ObjectArrayControlRenderer = (function(_super) {
        __extends(ObjectArrayControlRenderer, _super);
        function ObjectArrayControlRenderer(_uiSchema, _data, _dataSchema, uiSchemaRefs, _parentUISchemaParameter) {
          _super.call(this, _uiSchema, _data);
          this._dataSchema = _dataSchema;
          this.uiSchemaRefs = uiSchemaRefs;
          this._parentUISchemaParameter = _parentUISchemaParameter;
          if (this._parentUISchemaParameter == undefined)
            this._parentUISchemaParameter = {
              refUri: "",
              property: ""
            };
        }
        ObjectArrayControlRenderer.prototype.ngOnInit = function() {
          this._subSchema = PathUtil_1.PathUtil.resolveSchema(this._dataSchema, this._uiSchema['scope']['$ref']).items;
          if (this.uiSchemaRefs != null) {
            this._uiSchemaParameter = {
              refUri: RefUriHelper_1.RefUriHelper.getRefUri(this._parentUISchemaParameter, this._uiSchema['scope']['$ref'], this.uiSchemaRefs),
              property: this.fragment
            };
          }
        };
        ObjectArrayControlRenderer.prototype.getDefaultValue = function() {
          return {};
        };
        Object.defineProperty(ObjectArrayControlRenderer.prototype, "itemLabel", {
          get: function() {
            var itemLabel = PathUtil_1.PathUtil.beautify(this.fragment);
            if (itemLabel.charAt(itemLabel.length - 1) == 's')
              return itemLabel.substring(0, itemLabel.length - 1);
            return itemLabel;
          },
          enumerable: true,
          configurable: true
        });
        ObjectArrayControlRenderer = __decorate([core_1.Component({
          selector: 'ObjectArrayControlRenderer',
          template: "\n        <div class=\"forms_control\">\n            <label class=\"forms_objectArrayControlLabel forms_controlLabel\">{{label}}</label>\n            <fieldset>\n                <legend><button (click)=\"addItem()\">Add</button></legend>\n                <div *ngFor=\"#error of getErrors(_uiSchema.validation)\" class=\"forms_controlValidation\" style=\"display:inline-block;\">{{error|json}}</div>\n                <fieldset *ngFor=\"#item of _modelValue[fragment]; #i = index\" class=\"forms_objectArrayControls forms_ArrayControls\">\n                    <legend>{{itemLabel}}_{{i}} <button (click)=\"removeItem(item)\">Remove</button></legend>\n                    <form-outlet [data]=\"item\" [dataSchema]=\"_subSchema\" [uiSchemaParameter]=\"_uiSchemaParameter\" [root]=\"true\"></form-outlet>\n                </fieldset>\n            </fieldset>\n        </div>\n    ",
          styles: [""],
          directives: [forms_1.FormOutlet]
        }), __param(0, core_1.Inject('uiSchema')), __param(1, core_1.Inject('data')), __param(2, core_1.Inject('dataSchema')), __param(3, core_1.Inject('uiSchemaRefs')), __param(4, core_1.Optional()), __param(4, core_1.Inject('uiSchemaParameter')), __metadata('design:paramtypes', [Object, Object, Object, Object, Object])], ObjectArrayControlRenderer);
        return ObjectArrayControlRenderer;
      }(AbstractArrayControlRenderer_1.AbstractArrayControlRenderer));
      exports_1("ObjectArrayControlRenderer", ObjectArrayControlRenderer);
      exports_1("ObjectArrayControlRendererTester", ObjectArrayControlRendererTester = AbstractArrayControlRenderer_1.ArrayControlRendererTester('object', 1));
    }
  };
});

System.register("forms_a2/common_renderer/controls/AbstractControlRenderer", ["forms_a2/common_renderer/PathUtil", "forms_a2/forms/forms", "angular2/src/facade/lang"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var PathUtil_1,
      forms_1,
      lang_1;
  var AbstractControlRenderer,
      ControlRendererTester,
      TypeCheckerHelper,
      HasType;
  return {
    setters: [function(PathUtil_1_1) {
      PathUtil_1 = PathUtil_1_1;
    }, function(forms_1_1) {
      forms_1 = forms_1_1;
    }, function(lang_1_1) {
      lang_1 = lang_1_1;
    }],
    execute: function() {
      AbstractControlRenderer = (function() {
        function AbstractControlRenderer(_uiSchema, _data) {
          this._uiSchema = _uiSchema;
          this._data = _data;
          var fragments = PathUtil_1.PathUtil.filterNonKeywords(PathUtil_1.PathUtil.toPropertyFragments(_uiSchema.scope.$ref));
          this.fragment = fragments[fragments.length - 1];
          var fragmentsToObject = fragments.slice(0, fragments.length - 1);
          this._modelValue = PathUtil_1.PathUtil.resolveInstanceFromFragments(_data, fragmentsToObject);
        }
        Object.defineProperty(AbstractControlRenderer.prototype, "label", {
          get: function() {
            return PathUtil_1.PathUtil.beautify(this.fragment);
          },
          enumerable: true,
          configurable: true
        });
        AbstractControlRenderer.prototype.getErrors = function(error, index) {
          var _this = this;
          if (error == undefined || error == null)
            return [];
          var result = [];
          Object.keys(error).forEach(function(currentKey) {
            var value = error[currentKey];
            if (Array.isArray(value) && index == undefined) {
              result = _this.addFlattenedErrors(value, result);
            } else if (lang_1.isJsObject(value) && index != undefined && value.index == index)
              result = _this.addFlattenedErrors(value.error, result);
          }, []);
          return result;
        };
        AbstractControlRenderer.prototype.addFlattenedErrors = function(errorValues, result) {
          if (Array.isArray(errorValues))
            return errorValues.reduce(function(a, b) {
              return a.concat(b);
            }, result);
          return result.concat(errorValues);
        };
        return AbstractControlRenderer;
      }());
      exports_1("AbstractControlRenderer", AbstractControlRenderer);
      exports_1("ControlRendererTester", ControlRendererTester = function(type, specificity) {
        return function(element, dataSchema, dataObject) {
          if (element.type != 'Control')
            return forms_1.NOT_FITTING;
          var currentDataSchema = PathUtil_1.PathUtil.resolveSchema(dataSchema, element['scope']['$ref']);
          if (!TypeCheckerHelper(currentDataSchema, type))
            return forms_1.NOT_FITTING;
          return specificity;
        };
      });
      exports_1("TypeCheckerHelper", TypeCheckerHelper = function(dataSchema, type) {
        if (dataSchema.type != undefined && dataSchema.type == type)
          return true;
        if (dataSchema.allOf != undefined && dataSchema.allOf.every(function(element) {
          return HasType(element) ? TypeCheckerHelper(element, type) : true;
        }))
          return true;
        if (dataSchema.anyOf != undefined && dataSchema.anyOf.some(function(element) {
          return HasType(element) ? TypeCheckerHelper(element, type) : true;
        }))
          return true;
        if (dataSchema.oneOf != undefined && dataSchema.oneOf.some(function(element) {
          return HasType(element) ? TypeCheckerHelper(element, type) : true;
        }))
          return true;
        return false;
      });
      HasType = function(dataSchema) {
        if (dataSchema.type != undefined)
          return true;
        if (dataSchema.allOf != undefined)
          return dataSchema.allOf.some(function(element) {
            return HasType(element);
          });
        if (dataSchema.anyOf != undefined)
          return dataSchema.anyOf.some(function(element) {
            return HasType(element);
          });
        if (dataSchema.oneOf != undefined)
          return dataSchema.oneOf.some(function(element) {
            return HasType(element);
          });
        return false;
      };
    }
  };
});

System.register("forms_a2/common_renderer/controls/AbstractArrayControlRenderer", ["forms_a2/common_renderer/PathUtil", "forms_a2/forms/forms", "forms_a2/common_renderer/controls/AbstractControlRenderer"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var PathUtil_1,
      forms_1,
      AbstractControlRenderer_1;
  var AbstractArrayControlRenderer,
      ArrayControlRendererTester;
  return {
    setters: [function(PathUtil_1_1) {
      PathUtil_1 = PathUtil_1_1;
    }, function(forms_1_1) {
      forms_1 = forms_1_1;
    }, function(AbstractControlRenderer_1_1) {
      AbstractControlRenderer_1 = AbstractControlRenderer_1_1;
    }],
    execute: function() {
      AbstractArrayControlRenderer = (function(_super) {
        __extends(AbstractArrayControlRenderer, _super);
        function AbstractArrayControlRenderer(_uiSchema, _data) {
          _super.call(this, _uiSchema, _data);
        }
        AbstractArrayControlRenderer.prototype.removeItem = function(item) {
          var index = this._modelValue[this.fragment].indexOf(item);
          this._modelValue[this.fragment].splice(index, 1);
        };
        AbstractArrayControlRenderer.prototype.addItem = function() {
          if (this._modelValue[this.fragment] == undefined)
            this._modelValue[this.fragment] = [];
          this._modelValue[this.fragment].push(this.getDefaultValue());
        };
        AbstractArrayControlRenderer.prototype.trackByIndex = function(index, item) {
          return index;
        };
        return AbstractArrayControlRenderer;
      }(AbstractControlRenderer_1.AbstractControlRenderer));
      exports_1("AbstractArrayControlRenderer", AbstractArrayControlRenderer);
      exports_1("ArrayControlRendererTester", ArrayControlRendererTester = function(type, specificity) {
        return function(element, dataSchema, dataObject) {
          if (element.type != 'Control')
            return forms_1.NOT_FITTING;
          var currentDataSchema = PathUtil_1.PathUtil.resolveSchema(dataSchema, element['scope']['$ref']);
          if (currentDataSchema.type != 'array')
            return forms_1.NOT_FITTING;
          if (Array.isArray(currentDataSchema.items))
            return forms_1.NOT_FITTING;
          if (!AbstractControlRenderer_1.TypeCheckerHelper(currentDataSchema.items, type))
            return forms_1.NOT_FITTING;
          return specificity;
        };
      });
    }
  };
});

System.register("forms_a2/common_renderer/controls/NumberArrayControlRenderer", ["angular2/core", "forms_a2/common_renderer/controls/AbstractArrayControlRenderer"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var __param = (this && this.__param) || function(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  };
  var core_1,
      AbstractArrayControlRenderer_1;
  var NumberArrayControlRenderer,
      NumberArrayControlRendererTester;
  return {
    setters: [function(core_1_1) {
      core_1 = core_1_1;
    }, function(AbstractArrayControlRenderer_1_1) {
      AbstractArrayControlRenderer_1 = AbstractArrayControlRenderer_1_1;
    }],
    execute: function() {
      NumberArrayControlRenderer = (function(_super) {
        __extends(NumberArrayControlRenderer, _super);
        function NumberArrayControlRenderer(_uiSchema, _data) {
          _super.call(this, _uiSchema, _data);
        }
        NumberArrayControlRenderer.prototype.getDefaultValue = function() {
          return 0.0;
        };
        NumberArrayControlRenderer = __decorate([core_1.Component({
          selector: 'NumberArrayControlRenderer',
          template: "\n        <div class=\"forms_control\">\n            <label class=\"forms_numberArrayControlLabel forms_controlLabel\">{{label}}</label>\n            <div>\n                <button (click)=\"addItem()\">Add</button>\n                <div *ngFor=\"#error of getErrors(_uiSchema.validation)\" class=\"forms_controlValidation\" style=\"display:inline-block;\">{{error|json}}</div>\n                <div *ngFor=\"#item of _modelValue[fragment];#i = index;trackBy trackByIndex\" class=\"forms_numberArrayControls forms_ArrayControls\">\n                    <input type=\"number\" step=\"0.01\"  [(ngModel)]=\"_modelValue[fragment][i]\" class=\"forms_controlInput\"/>\n                    <button (click)=\"removeItem(item)\">Remove</button>\n                    <div *ngFor=\"#error of getErrors(_uiSchema.validation,i)\" class=\"forms_controlValidation\" style=\"display:inline-block;\">{{error|json}}</div>\n                </div>\n            </div>\n        </div>\n    ",
          styles: [""],
          directives: [],
          changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), __param(0, core_1.Inject('uiSchema')), __param(1, core_1.Inject('data')), __metadata('design:paramtypes', [Object, Object])], NumberArrayControlRenderer);
        return NumberArrayControlRenderer;
      }(AbstractArrayControlRenderer_1.AbstractArrayControlRenderer));
      exports_1("NumberArrayControlRenderer", NumberArrayControlRenderer);
      exports_1("NumberArrayControlRendererTester", NumberArrayControlRendererTester = AbstractArrayControlRenderer_1.ArrayControlRendererTester('number', 1));
    }
  };
});

System.register("forms_a2/common_renderer/common_renderer", ["forms_a2/common_renderer/layouts/VerticalLayoutRenderer", "forms_a2/common_renderer/layouts/HorizontalLayoutRenderer", "forms_a2/common_renderer/layouts/GroupLayoutRenderer", "forms_a2/common_renderer/controls/TextControlRenderer", "forms_a2/common_renderer/controls/NumberControlRenderer", "forms_a2/common_renderer/controls/IntegerControlRenderer", "forms_a2/common_renderer/controls/BooleanControlRenderer", "forms_a2/common_renderer/controls/EnumControlRenderer", "forms_a2/common_renderer/controls/ObjectControlRenderer", "forms_a2/common_renderer/controls/ObjectArrayControlRenderer", "forms_a2/common_renderer/controls/NumberArrayControlRenderer"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var VerticalLayoutRenderer_1,
      HorizontalLayoutRenderer_1,
      GroupLayoutRenderer_1,
      TextControlRenderer_1,
      NumberControlRenderer_1,
      IntegerControlRenderer_1,
      BooleanControlRenderer_1,
      EnumControlRenderer_1,
      ObjectControlRenderer_1,
      ObjectArrayControlRenderer_1,
      NumberArrayControlRenderer_1;
  function formCommonRendererFactory() {
    var renderer = new Array();
    renderer.push({
      renderer: VerticalLayoutRenderer_1.VerticalLayoutRenderer,
      tester: VerticalLayoutRenderer_1.VerticalLayoutRendererTester
    });
    renderer.push({
      renderer: HorizontalLayoutRenderer_1.HorizontalLayoutRenderer,
      tester: HorizontalLayoutRenderer_1.HorizontalLayoutRendererTester
    });
    renderer.push({
      renderer: GroupLayoutRenderer_1.GroupLayoutRenderer,
      tester: GroupLayoutRenderer_1.GroupLayoutRendererTester
    });
    renderer.push({
      renderer: TextControlRenderer_1.TextControlRenderer,
      tester: TextControlRenderer_1.TextControlRendererTester
    });
    renderer.push({
      renderer: NumberControlRenderer_1.NumberControlRenderer,
      tester: NumberControlRenderer_1.NumberControlRendererTester
    });
    renderer.push({
      renderer: IntegerControlRenderer_1.IntegerControlRenderer,
      tester: IntegerControlRenderer_1.IntegerControlRendererTester
    });
    renderer.push({
      renderer: BooleanControlRenderer_1.BooleanControlRenderer,
      tester: BooleanControlRenderer_1.BooleanControlRendererTester
    });
    renderer.push({
      renderer: EnumControlRenderer_1.EnumControlRenderer,
      tester: EnumControlRenderer_1.EnumControlRendererTester
    });
    renderer.push({
      renderer: ObjectControlRenderer_1.ObjectControlRenderer,
      tester: ObjectControlRenderer_1.ObjectControlRendererTester
    });
    renderer.push({
      renderer: ObjectArrayControlRenderer_1.ObjectArrayControlRenderer,
      tester: ObjectArrayControlRenderer_1.ObjectArrayControlRendererTester
    });
    renderer.push({
      renderer: NumberArrayControlRenderer_1.NumberArrayControlRenderer,
      tester: NumberArrayControlRenderer_1.NumberArrayControlRendererTester
    });
    return renderer;
  }
  exports_1("formCommonRendererFactory", formCommonRendererFactory);
  return {
    setters: [function(VerticalLayoutRenderer_1_1) {
      VerticalLayoutRenderer_1 = VerticalLayoutRenderer_1_1;
    }, function(HorizontalLayoutRenderer_1_1) {
      HorizontalLayoutRenderer_1 = HorizontalLayoutRenderer_1_1;
    }, function(GroupLayoutRenderer_1_1) {
      GroupLayoutRenderer_1 = GroupLayoutRenderer_1_1;
    }, function(TextControlRenderer_1_1) {
      TextControlRenderer_1 = TextControlRenderer_1_1;
    }, function(NumberControlRenderer_1_1) {
      NumberControlRenderer_1 = NumberControlRenderer_1_1;
    }, function(IntegerControlRenderer_1_1) {
      IntegerControlRenderer_1 = IntegerControlRenderer_1_1;
    }, function(BooleanControlRenderer_1_1) {
      BooleanControlRenderer_1 = BooleanControlRenderer_1_1;
    }, function(EnumControlRenderer_1_1) {
      EnumControlRenderer_1 = EnumControlRenderer_1_1;
    }, function(ObjectControlRenderer_1_1) {
      ObjectControlRenderer_1 = ObjectControlRenderer_1_1;
    }, function(ObjectArrayControlRenderer_1_1) {
      ObjectArrayControlRenderer_1 = ObjectArrayControlRenderer_1_1;
    }, function(NumberArrayControlRenderer_1_1) {
      NumberArrayControlRenderer_1 = NumberArrayControlRenderer_1_1;
    }],
    execute: function() {}
  };
});

System.register("forms_a2/common_services/LogService", ["forms_a2/forms/forms"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var forms_1;
  var MyLogService,
      MyLogServiceFactory;
  return {
    setters: [function(forms_1_1) {
      forms_1 = forms_1_1;
    }],
    execute: function() {
      MyLogService = (function(_super) {
        __extends(MyLogService, _super);
        function MyLogService(dataSchema, uiSchema, data) {
          _super.call(this, dataSchema, uiSchema, data);
        }
        MyLogService.prototype.onChange = function(changeNotification) {};
        MyLogService.prototype.onAdd = function(changeNotification) {};
        MyLogService.prototype.onRemove = function(changeNotification) {};
        return MyLogService;
      }(forms_1.FormsService));
      MyLogServiceFactory = (function() {
        function MyLogServiceFactory() {}
        MyLogServiceFactory.prototype.createFormService = function(dataSchema, uiSchema, data) {
          return new MyLogService(dataSchema, uiSchema, data);
        };
        return MyLogServiceFactory;
      }());
      exports_1("MyLogServiceFactory", MyLogServiceFactory);
    }
  };
});

System.register("forms_a2/common_services/common_services", ["forms_a2/common_services/LogService", "forms_a2/common_services/ValidationService"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var LogService_1,
      ValidationService_1;
  function formCommonServicesFactory() {
    var services = new Array();
    services.push(new LogService_1.MyLogServiceFactory());
    services.push(new ValidationService_1.ValidationServiceFactory());
    return services;
  }
  exports_1("formCommonServicesFactory", formCommonServicesFactory);
  return {
    setters: [function(LogService_1_1) {
      LogService_1 = LogService_1_1;
    }, function(ValidationService_1_1) {
      ValidationService_1 = ValidationService_1_1;
    }],
    execute: function() {}
  };
});

System.register("forms_a2/forms/forms", ["forms_a2/forms/renderer_config_decorator", "forms_a2/forms/service_config_impl", "forms_a2/forms/uischema_service/uischema_config_decorator", "forms_a2/forms/renderer_registry", "forms_a2/forms/uischema_service/uischema_registry", "forms_a2/forms/form_outlet", "angular2/core", "angular2/src/facade/lang", "angular2/src/facade/exceptions", "forms_a2/common_renderer/common_renderer", "forms_a2/common_services/common_services"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var core_1,
      lang_1,
      exceptions_1,
      uischema_registry_1,
      renderer_registry_1,
      form_outlet_1,
      common_renderer_1,
      common_services_1;
  var NOT_FITTING,
      FORM_DIRECTIVES,
      FORM_PROVIDERS;
  function formPrimaryComponentFactory(app) {
    if (app.componentTypes.length == 0) {
      throw new exceptions_1.BaseException("Bootstrap at least one component before injecting Router.");
    }
    return app.componentTypes[0];
  }
  var exportedNames_1 = {
    'NOT_FITTING': true,
    'FORM_DIRECTIVES': true,
    'FORM_PROVIDERS': true,
    'RendererRegistry': true,
    'UISchemaProviderService': true,
    'FormOutlet': true
  };
  function exportStar_1(m) {
    var exports = {};
    for (var n in m) {
      if (n !== "default" && !exportedNames_1.hasOwnProperty(n))
        exports[n] = m[n];
    }
    exports_1(exports);
  }
  return {
    setters: [function(renderer_config_decorator_1_1) {
      exportStar_1(renderer_config_decorator_1_1);
    }, function(service_config_impl_1_1) {
      exportStar_1(service_config_impl_1_1);
    }, function(uischema_config_decorator_1_1) {
      exportStar_1(uischema_config_decorator_1_1);
    }, function(renderer_registry_2_1) {
      exports_1({"RendererRegistry": renderer_registry_2_1["RendererRegistry"]});
      renderer_registry_1 = renderer_registry_2_1;
    }, function(uischema_registry_2_1) {
      exports_1({"UISchemaProviderService": uischema_registry_2_1["UISchemaProviderService"]});
      uischema_registry_1 = uischema_registry_2_1;
    }, function(form_outlet_2_1) {
      exports_1({"FormOutlet": form_outlet_2_1["FormOutlet"]});
      form_outlet_1 = form_outlet_2_1;
    }, function(core_1_1) {
      core_1 = core_1_1;
    }, function(lang_1_1) {
      lang_1 = lang_1_1;
    }, function(exceptions_1_1) {
      exceptions_1 = exceptions_1_1;
    }, function(common_renderer_1_1) {
      common_renderer_1 = common_renderer_1_1;
    }, function(common_services_1_1) {
      common_services_1 = common_services_1_1;
    }],
    execute: function() {
      exports_1("NOT_FITTING", NOT_FITTING = -1);
      exports_1("FORM_DIRECTIVES", FORM_DIRECTIVES = lang_1.CONST_EXPR([form_outlet_1.FormOutlet]));
      exports_1("FORM_PROVIDERS", FORM_PROVIDERS = lang_1.CONST_EXPR([renderer_registry_1.RendererRegistry, uischema_registry_1.UISchemaProviderService, lang_1.CONST_EXPR(core_1.provide('FormPrimaryComponent', {
        useFactory: formPrimaryComponentFactory,
        deps: lang_1.CONST_EXPR([core_1.ApplicationRef])
      })), lang_1.CONST_EXPR(core_1.provide(renderer_registry_1.FORM_DEFAULT_RENDERER, {useFactory: common_renderer_1.formCommonRendererFactory})), lang_1.CONST_EXPR(core_1.provide('FormServiceFactories', {useFactory: common_services_1.formCommonServicesFactory}))]));
    }
  };
});

System.register("forms_a2/common_renderer/PathUtil", [], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var PathUtil;
  return {
    setters: [],
    execute: function() {
      PathUtil = (function() {
        function PathUtil() {}
        PathUtil.Keywords = ["items", "properties", "#", "allOf", "anyOf", "oneOf"];
        PathUtil.toPropertyFragments = function(path) {
          if (path === undefined) {
            return [];
          }
          return path.split('/').filter(function(fragment) {
            return fragment.length > 0;
          });
        };
        PathUtil.toInstancePath = function(path) {
          return PathUtil.normalize(path);
        };
        PathUtil.normalize = function(path) {
          return PathUtil.filterNonKeywords(PathUtil.toPropertyFragments(path)).join("/");
        };
        PathUtil.filterNonKeywords = function(fragments) {
          return fragments.filter(function(fragment) {
            return PathUtil.Keywords.indexOf(fragment) === -1 && isNaN(Number(fragment));
          });
        };
        PathUtil.resolveSchema = function(schema, path) {
          try {
            var fragments = PathUtil.toPropertyFragments(path);
            return fragments.reduce(function(subSchema, fragment) {
              if (fragment == "#") {
                return subSchema;
              } else if (subSchema instanceof Array) {
                return subSchema[fragment];
              }
              return subSchema[fragment];
            }, schema);
          } catch (err) {
            return undefined;
          }
        };
        PathUtil.resolveInstanceFromPath = function(instance, schemaPath, createDummy) {
          if (createDummy === void 0) {
            createDummy = true;
          }
          return PathUtil.resolveInstanceFromFragments(instance, PathUtil.toPropertyFragments(PathUtil.toInstancePath(schemaPath)), createDummy);
        };
        PathUtil.resolveInstanceFromFragments = function(instance, fragments, createDummy) {
          if (createDummy === void 0) {
            createDummy = true;
          }
          return fragments.reduce(function(currObj, fragment) {
            if (currObj == undefined)
              return undefined;
            if (currObj instanceof Array) {
              return currObj[fragment];
            }
            if (!currObj.hasOwnProperty(fragment)) {
              if (createDummy)
                currObj[fragment] = {};
              else
                return undefined;
            }
            return currObj[fragment];
          }, instance);
        };
        PathUtil.beautify = function(text) {
          if (text && text.length > 0) {
            var textArray = text.split(/(?=[A-Z])/).map(function(x) {
              return x.toLowerCase();
            });
            textArray = textArray.map(function(value) {
              return value.charAt(0).toUpperCase() + value.slice(1);
            });
            return textArray.join(' ');
          }
          return text;
        };
        return PathUtil;
      }());
      exports_1("PathUtil", PathUtil);
    }
  };
});

System.register("forms_a2/common_services/ValidationService", ["forms_a2/forms/forms", "forms_a2/common_renderer/PathUtil"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var forms_1,
      PathUtil_1;
  var ValidationServiceFactory,
      ValidationService;
  return {
    setters: [function(forms_1_1) {
      forms_1 = forms_1_1;
    }, function(PathUtil_1_1) {
      PathUtil_1 = PathUtil_1_1;
    }],
    execute: function() {
      ValidationServiceFactory = (function() {
        function ValidationServiceFactory() {}
        ValidationServiceFactory.prototype.createFormService = function(dataSchema, uiSchema, data) {
          return new ValidationService(dataSchema, uiSchema, data);
        };
        return ValidationServiceFactory;
      }());
      exports_1("ValidationServiceFactory", ValidationServiceFactory);
      ValidationService = (function(_super) {
        __extends(ValidationService, _super);
        function ValidationService(dataSchema, uiSchema, data) {
          _super.call(this, dataSchema, uiSchema, data);
          this.validate(null);
        }
        ValidationService.prototype.onChange = function(changeNotification) {
          this.validate(changeNotification);
        };
        ValidationService.prototype.onAdd = function(changeNotification) {
          this.validate(changeNotification);
        };
        ValidationService.prototype.onRemove = function(changeNotification) {
          this.validate(changeNotification);
        };
        ValidationService.prototype.validate = function(changeNotification) {
          var results = tv4.validateMultiple(changeNotification == null ? this._data : changeNotification.newData(this._data), this._dataSchema);
          var result = {};
          var foundErrors = false;
          results['errors'].forEach(function(error) {
            var propName;
            if (error['schemaPath'].indexOf("required") != -1) {
              propName = error['dataPath'] + "/" + error['params']['key'];
            } else {
              propName = error['dataPath'];
            }
            propName = propName.substr(1);
            if (!result.hasOwnProperty(propName)) {
              result[propName] = [];
            }
            result[propName].push(error['message']);
            foundErrors = true;
          });
          this.cleanControlObjects(this._uiSchema);
          this.mapErrorOnControlObject(this._uiSchema, result);
        };
        ValidationService.prototype.cleanControlObjects = function(uiSchema) {
          if (uiSchema.hasOwnProperty('elements')) {
            var children = uiSchema['elements'];
            for (var i = 0; i < children.length; i++) {
              this.cleanControlObjects(children[i]);
            }
          } else if (uiSchema.hasOwnProperty('scope')) {
            uiSchema['validation'] = null;
          }
        };
        ValidationService.prototype.mapErrorOnControlObject = function(fullSchema, errors) {
          if (fullSchema.hasOwnProperty('elements')) {
            var children = fullSchema['elements'];
            for (var i = 0; i < children.length; i++) {
              this.mapErrorOnControlObject(children[i], errors);
            }
          } else if (fullSchema.hasOwnProperty('scope')) {
            var path_1 = PathUtil_1.PathUtil.normalize(fullSchema['scope']['$ref']);
            var keys = Object.keys(errors);
            var relevantKeys = keys.filter(function(value) {
              return value.indexOf(path_1) != -1 && value.substr(path_1.length + 1).indexOf("/") == -1;
            });
            if (relevantKeys.length == 0) {
              return;
            }
            var allErrors_1 = [];
            relevantKeys.forEach(function(key) {
              var indexOfSlash = key.indexOf("/");
              if (indexOfSlash == -1)
                allErrors_1.push(errors[key]);
              else {
                var position = key.substr(indexOfSlash + 1);
                allErrors_1.push({
                  "index": position,
                  "error": errors[key]
                });
              }
            });
            fullSchema['validation'] = allErrors_1;
          }
        };
        return ValidationService;
      }(forms_1.FormsService));
    }
  };
});

System.register("forms_a2/common_services/services", ["forms_a2/common_services/LogService", "forms_a2/common_services/RuleService", "forms_a2/common_services/ValidationService"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  function exportStar_1(m) {
    var exports = {};
    for (var n in m) {
      if (n !== "default")
        exports[n] = m[n];
    }
    exports_1(exports);
  }
  return {
    setters: [function(LogService_1_1) {
      exportStar_1(LogService_1_1);
    }, function(RuleService_1_1) {
      exportStar_1(RuleService_1_1);
    }, function(ValidationService_1_1) {
      exportStar_1(ValidationService_1_1);
    }],
    execute: function() {}
  };
});

System.register("forms_a2/forms_a2", ["forms_a2/forms/forms", "forms_a2/common_renderer/renderer", "forms_a2/common_services/services"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  function exportStar_1(m) {
    var exports = {};
    for (var n in m) {
      if (n !== "default")
        exports[n] = m[n];
    }
    exports_1(exports);
  }
  return {
    setters: [function(forms_1_1) {
      exportStar_1(forms_1_1);
    }, function(renderer_1_1) {
      exportStar_1(renderer_1_1);
    }, function(services_1_1) {
      exportStar_1(services_1_1);
    }],
    execute: function() {}
  };
});

//# sourceMappingURL=bundle.map
