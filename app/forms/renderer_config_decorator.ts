import {RendererConfig as RendererConfigAnnotation,RendererDefinition} from './renderer_config_impl';
import {makeDecorator} from 'angular2/src/core/util/decorators';
import {Type} from 'angular2/src/facade/lang';

// Copied from RouteConfig in renderer_config_impl.
/**
 * The `RendererConfig` decorator defines renderers for a given component.
 *
 * It takes an array of {@link RendererDefinition}s.
 */
export var RendererConfig: (configs: RendererDefinition[]) => ClassDecorator =
    makeDecorator(RendererConfigAnnotation);
