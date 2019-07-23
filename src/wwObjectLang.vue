<template>
    <div class="ww-lang" @mouseover="setHoverMenu(true)" @mouseleave="setHoverMenu(false)" :style="{'color': mainColor}">
        <div class="ww-lang-flag-title">
            <img :src="flag" />
            <div class="dropdown-icon">
                <wwObject tag="div" class="dropdown-button-icon" :ww-object="wwObject.content.data.dropDownIcon" :class="{'rotate-icon':enabledMenu}"></wwObject>
            </div>
        </div>

        <div class="hover-zone">
            <div class="triangle">
                <div class="triangle-after" :style="{'background-color': backgroundColor}"></div>
            </div>
            <div class="lang-container" :style="{'color': mainColor, 'background-color': backgroundColor}">
                <div
                    class="lang"
                    v-for="(lang, index) in availableLangs"
                    :src="flag"
                    :key="lang"
                    @mouseover="setHoverColor(true, index)"
                    @mouseleave="setHoverColor(false, index)"
                    :style="{'background-color': ((elementHover && (activeElementIndex == index)) ? hoverColor: ''), 'color': ((elementHover && (activeElementIndex == index)) ? hoverColorText: '')}"
                    @click="setLang(lang)"
                >
                    <div class="ww-lang-flag">
                        <img :src="displayFlag(lang)" />
                        {{displayLang(lang)}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
 

<script>
import Vue from 'vue';

export default {
    name: "__COMPONENT_NAME__",
    props: {
        wwObjectCtrl: Object,
        wwAttrs: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            enabledMenu: false,
            elementHover: false,
            activeElement: 0
        }
    },
    computed: {
        wwObject() {
            return this.wwObjectCtrl.get();
        },
        editMode() {
            return this.wwObjectCtrl.getEditMode() == 'CONTENT'
        },
        mainColor() {
            return this.wwObject.content.data.mainColor || '#2c2c2c'
        },
        iconColor() {
            return this.wwObject.content.data.iconColor || '#d9d9d9'
        },
        flag() {
            return wwLib.wwApiRequests._getCdnUrl() + 'public/images/flags/' + this.currentLang + '.png'
        },
        backgroundColor() {
            return this.wwObject.content.data.backgroundColor
        },
        hoverColor() {
            return this.wwObject.content.data.hoverColor
        },
        hoverColorText() {
            return this.wwObject.content.data.hoverColorText
        },
        colorText() {
            return this.wwObject.content.data.colorText
        },
        activeElementIndex() {
            return this.activeElement
        },
        currentLang() {
            return wwLib.$store.getters["front/getLang"]
        },
        availableLangs() {
            return wwLib.$store.getters["websiteData/getPage"].langs
        }
    },
    watch: {
    },
    methods: {
        init() {
            this.loaded = true
            this.wwObject.content.data = this.wwObject.content.data || {}
            this.wwObject.content.data.backgroundColor = this.wwObject.content.data.backgroundColor || '#ffffff'
            this.wwObject.content.data.hoverColor = this.wwObject.content.data.hoverColor || '#fafafa'
            this.wwObject.content.data.hoverColorText = this.wwObject.content.data.hoverColorText || '#8f1afe'


            if (!this.wwObject.content.data.dropDownIcon) {
                this.wwObject.content.data.dropDownIcon = wwLib.wwObject.getDefault({
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
                })
                this.wwObjectCtrl.update(this.wwObject);

            }
        },
        setLang(lang) {
            wwLib.wwLang.setLang(lang)
        },
        displayLang(lang) {
            for (const l of wwLib.wwLang.availableLangs) {
                if (l.value.toLowerCase() == lang.toLowerCase()) {
                    return l.name;
                }
            }
        },
        displayFlag(lang) {
            return wwLib.wwApiRequests._getCdnUrl() + 'public/images/flags/' + lang + '.png'
        },
        setHoverMenu(value) {
            this.enabledMenu = value
        },
        setHoverColor(value, index) {
            this.activeElement = index
            this.elementHover = value
        },
        /* wwManager:start */
        async edit() {
            wwLib.wwObjectHover.setLock(this);
            let editList = {
                WWLANG_BGCOLOR: {
                    title: {
                        en: 'Edit the popup colors',
                        fr: 'Configurer les couleurs du popup'
                    },
                    desc: {
                        en: 'Edit the popup colors, background, hover and text',
                        fr: 'Éditer la couleur du fond, du hover et du texte'
                    },
                    icon: 'wwi wwi-color',
                    shortcut: 'd',
                    next: 'WWLANG_BGCOLOR'
                }
            }
            wwLib.wwPopups.addStory('WWLANG_BGCOLOR', {
                title: {
                    en: 'Color picker',
                    fr: 'Choisir une couleur'
                },
                type: 'wwPopupForm',
                storyData: {
                    fields: [
                        {
                            label: {
                                en: 'Background color:',
                                fr: 'Couleur du fond :'
                            },
                            type: 'color',
                            key: 'backgroundColor',
                            valueData: 'wwObject.content.data.backgroundColor',
                            desc: {
                                en: 'Choose a background color',
                                fr: 'Changer la couleur du fond '
                            }
                        },
                        {
                            label: {
                                en: 'Text color:',
                                fr: 'Couleur du text :'
                            },
                            type: 'color',
                            key: 'mainColor',
                            valueData: 'wwObject.content.data.mainColor',
                            desc: {
                                en: 'Edit the object text color',
                                fr: 'Éditer la couleur du texte '
                            }
                        },
                        {
                            label: {
                                en: 'Text hover color:',
                                fr: 'Couleur au survol :'
                            },
                            type: 'color',
                            key: 'hoverColorText',
                            valueData: 'wwObject.content.data.hoverColorText',
                            desc: {
                                en: 'Edit the object text hover color',
                                fr: 'Éditer la couleur du texte au survol '
                            }
                        },
                        {
                            label: {
                                en: 'Text\'s background hover color:',
                                fr: 'Couleur du fond du text au survol :'
                            },
                            type: 'color',
                            key: 'hoverColor',
                            valueData: 'wwObject.content.data.hoverColor',
                            desc: {
                                en: 'Choose the text\'s background hover color',
                                fr: 'Changer la couleur du fond du text au survol '
                            }
                        },
                    ]
                },
                buttons: {

                    NEXT: {
                        text: {
                            en: 'Ok',
                            fr: 'Ok'
                        },
                        next: false
                    }
                }
            })


            wwLib.wwPopups.addStory('WWLANG_EDIT', {
                title: {
                    en: 'Edit lang menu',
                    fr: 'Editer le menu langue '
                },
                type: 'wwPopupEditWwObject',
                buttons: null,
                storyData: {
                    list: editList
                }
            })

            let options = {
                firstPage: 'WWLANG_EDIT',
                data: {
                    wwObject: this.wwObject,
                }
            }

            try {
                const result = await wwLib.wwPopups.open(options);

                /*=============================================m_ÔÔ_m=============================================\
                  STYLE
                \================================================================================================*/
                if (typeof (result.mainColor) != 'undefined') {
                    this.wwObject.content.data.mainColor = result.mainColor;
                }
                if (typeof (result.backgroundColor) != 'undefined') {
                    this.wwObject.content.data.backgroundColor = result.backgroundColor;
                }
                if (typeof (result.hoverColor) != 'undefined') {
                    this.wwObject.content.data.hoverColor = result.hoverColor;
                }
                if (typeof (result.hoverColorText) != 'undefined') {
                    this.wwObject.content.data.hoverColorText = result.hoverColorText;
                }

                this.wwObjectCtrl.update(this.wwObject);
                this.wwObjectCtrl.globalEdit(result);
            } catch (error) {
                console.log(error);
            }
            wwLib.wwObjectHover.removeLock();
        }
        /* wwManager:end */
    },
    mounted() {
        this.init();

        this.$emit('ww-loaded', this);

    },
    beforeDestroyed() {
        //window.removeEventListener('resize', this.wwOnResize);
    }
};
</script>

<style lang="scss" scoped>
.ww-lang {
    position: relative;
    min-width: 50px;
    height: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
    .ww-lang-flag-title {
        position: relative;
        cursor: pointer;
        display: flex;
        align-items: center;
        font-size: 1.2rem;
        img {
            margin-left: 5px;
            margin-right: 5px;
            width: 30px;
            border-radius: 10px;
        }
        .dropdown-icon {
            .rotate-icon {
                transform: rotate(180deg);
            }
        }
    }
    .hover-zone {
        position: absolute;
        bottom: 0px;
        transform: translate(-70%, 100%);
        visibility: hidden;
        opacity: 0;
        transition: visibility 0s, opacity 0.2s linear;
        z-index: 10;
        .triangle {
            width: 20px;
            height: 20px;
            position: relative;
            overflow: hidden;
            float: right;
            right: 30px;
            top: 1px;
            box-shadow: 0 16px 10px -17px rgba(0, 0, 0, 0.5);
        }
        .triangle-after {
            position: absolute;
            width: 15px;
            height: 15px;
            transform: rotate(45deg);
            top: 13px;
            left: 2px;
            box-shadow: 0px 0px 6px -2px rgba(0, 0, 0, 0.5);
        }
        .lang-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 200px;
            box-shadow: 0px 0px 3px 0px #bfbfbf;
            border-radius: 10px;
            font-family: sans-serif;
            padding: 5px 0;
            color: black;
            box-shadow: black;
            .lang {
                width: 100%;
                padding: 5px 10px;
                border-radius: 10px;
                cursor: pointer;
                .ww-lang-flag {
                    position: relative;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    font-size: 1.2rem;
                    img {
                        margin-left: 5px;
                        margin-right: 5px;
                        width: 20px;
                        border-radius: 7px;
                    }
                }
            }
        }
    }
    &:hover {
        .hover-zone {
            visibility: visible;
            opacity: 1;
        }
    }
}
</style>
