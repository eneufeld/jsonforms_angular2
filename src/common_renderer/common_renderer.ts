import {OpaqueToken,provide,Provider} from 'angular2/core';
import {CONST_EXPR} from 'angular2/src/facade/lang';

import {RendererDefinition} from '../forms/renderer_config_impl';
import {VerticalLayoutRenderer,VerticalLayoutRendererTester} from './layouts/VerticalLayoutRenderer';
import {HorizontalLayoutRenderer,HorizontalLayoutRendererTester} from './layouts/HorizontalLayoutRenderer';
import {GroupLayoutRenderer,GroupLayoutRendererTester} from './layouts/GroupLayoutRenderer';
import {TextControlRenderer,TextControlRendererTester} from './controls/TextControlRenderer';
import {NumberControlRenderer,NumberControlRendererTester} from './controls/NumberControlRenderer';
import {IntegerControlRenderer,IntegerControlRendererTester} from './controls/IntegerControlRenderer';
import {BooleanControlRenderer,BooleanControlRendererTester} from './controls/BooleanControlRenderer';
import {EnumControlRenderer,EnumControlRendererTester} from './controls/EnumControlRenderer';
import {ArrayObjectRenderer,ArrayObjectRendererTester} from './controls/ArrayObjectRenderer';

export function formCommonRendererFactory() {
  var renderer : Array<RendererDefinition>=new Array<RendererDefinition>();
  renderer.push({renderer:VerticalLayoutRenderer,tester:VerticalLayoutRendererTester});
  renderer.push({renderer:HorizontalLayoutRenderer,tester:HorizontalLayoutRendererTester});
  renderer.push({renderer:GroupLayoutRenderer,tester:GroupLayoutRendererTester});
  renderer.push({renderer:TextControlRenderer,tester:TextControlRendererTester});
  renderer.push({renderer:NumberControlRenderer,tester:NumberControlRendererTester});
  renderer.push({renderer:IntegerControlRenderer,tester:IntegerControlRendererTester});
  renderer.push({renderer:BooleanControlRenderer,tester:BooleanControlRendererTester});
  renderer.push({renderer:EnumControlRenderer,tester:EnumControlRendererTester});
  renderer.push({renderer:ArrayObjectRenderer,tester:ArrayObjectRendererTester});
  return renderer;
}
