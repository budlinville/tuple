import { Meta, Story } from "@storybook/react";

import SplitPane, { Props as SplitPaneProps } from '.';

export default {
    title: 'Components/SplitPane',
    component: SplitPane,
} as Meta;


//----------------------------------------------------------------------------------------------------------------------
// Template
//----------------------------------------------------------------------------------------------------------------------
const Template: Story<SplitPaneProps> = (args: any) => (
    <div style = {{ height: '700px', width: '1000px' }}>
        <SplitPane {...args}>
            <div style={{ background: 'red', width: '100%', height: '100%' }}>HEAD</div>
            <div style={{ background: 'yellow', width: '100%', height: '100%' }}>TAIL</div>
        </SplitPane>
    </div>
);


export const Horizontal = Template.bind({});
Horizontal.args = {
    dir: 'horizontal',
    resizerPos: '50%',
    resizable: true,
};


export const Vertical = Template.bind({});
Vertical.args = {
    dir: 'vertical',
    resizerPos: '50%',
    resizable: true,
};
