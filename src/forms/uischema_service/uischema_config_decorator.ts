import {UISchemaProviderConfig as UISchemaProviderConfigAnnotation,UISchemaProvider} from './uischema_config_impl';
import {makeDecorator} from 'angular2/src/core/util/decorators';
import {Type} from 'angular2/src/facade/lang';

// Copied from RouteConfig in renderer_config_impl.
/**
 * The `RendererConfig` decorator defines renderers for a given component.
 *
 * It takes an array of {@link RendererDefinition}s.
 */
export var UISchemaProviderConfig: (configs: UISchemaProvider[]) => ClassDecorator =
    makeDecorator(UISchemaProviderConfigAnnotation);
