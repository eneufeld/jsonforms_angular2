import { RendererDefinition } from './renderer_config_impl';
/**
 * The `RendererConfig` decorator defines renderers for a given component.
 *
 * It takes an array of {@link RendererDefinition}s.
 */
export declare var RendererConfig: (configs: RendererDefinition[]) => ClassDecorator;
