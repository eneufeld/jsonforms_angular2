import {OpaqueToken,provide,Provider} from 'angular2/core';
import {CONST_EXPR} from 'angular2/src/facade/lang';

import {RendererDefinition} from '../forms/renderer_config_impl';
import {VerticalLayoutRenderer,VerticalLayoutRendererTester} from '../common_renderer/VerticalLayoutRenderer';
import {HorizontalLayoutRenderer,HorizontalLayoutRendererTester} from '../common_renderer/HorizontalLayoutRenderer';
import {GroupLayoutRenderer,GroupLayoutRendererTester} from './GroupLayoutRenderer';
import {TextControlRenderer,TextControlRendererTester} from './TextControlRenderer';

export function formCommonRendererFactory() {
  var renderer : Array<RendererDefinition>=new Array<RendererDefinition>();
  renderer.push({renderer:VerticalLayoutRenderer,tester:VerticalLayoutRendererTester});
  renderer.push({renderer:HorizontalLayoutRenderer,tester:HorizontalLayoutRendererTester});
  renderer.push({renderer:GroupLayoutRenderer,tester:GroupLayoutRendererTester});
  renderer.push({renderer:TextControlRenderer,tester:TextControlRendererTester});
  return renderer;
}
