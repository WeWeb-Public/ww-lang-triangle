import wwObject from './wwObjectLang.vue'

const name = "__NAME__";
const version = '__VERSION__';

const addComponent = function () {
    if (window.vm) {

        wwLib.wwObject.register({
            content: {
                type: name,
                data: {
                    dropDownIcon: wwLib.wwObject.getDefault({
                        type: 'ww-icon',
                        data: {
                            icon: "fas fa-angle-down",
                            style: {
                                backgroundColor: '#FFFFFF00',
                                borderWidth: 0,
                                size: 24,
                                fontSize: 24
                            }
                        }
                    }),
                    mainColor: '#000000',
                    backgroundColor: '#FFFFFF',
                    hoverColor: '#FAFAFA',
                    hoverColorText: '#8f1afe',
                }
            },
            upsales: {
                wwAnalytics: {
                    click: false
                }
            },
            /* wwManager:start */
            cmsOptions: {
                wwObjectHover: {
                    //pointerEvents: true
                },
                wwObjectMenu: {
                    items: [
                        {
                            name: 'OPTIONS',
                            main: true,
                            text: {
                                en: 'Options',
                                fr: 'Options'
                            },
                            icon: 'wwi wwi-edit-other',
                            action: 'edit'
                        }
                    ]
                }
            }
            /* wwManager:end */
        });

        window.vm.addComponent({
            name: name,
            version: version,
            content: wwObject
        });

        return true;
    }
    return false;
}

if (!addComponent()) {
    const iniInterval = setInterval(function () {
        if (addComponent()) {
            clearInterval(iniInterval);
        }
    }, 10);
}