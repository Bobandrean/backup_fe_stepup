<template>
    <v-menu>
        <template v-slot:activator="{ props }">
            <v-btn  v-bind="props">
               <span >{{ label }}</span>
            </v-btn>
        </template>
        <v-list @click:select="handleSelect" >
            <v-list-item v-for="(item, index) in items" :key="index" :value="index" >
                <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script>

import { defineEmits } from 'vue';

export default {
    props: {
        items: {
            type: Array,
            default: () => [],
        },
        label: {
            type: String,
            default: "",
        },
        dense: {
            type: Boolean,
            default: false,
        },
        solo: {
            type: Boolean,
            default: false,
        },
        value: {
            type: [Number, String, Object],
            default: "",
        },
        itemText: {
            type: String,
            default: "text",
        },
        itemValue: {
            type: String,
            default: "value",
        },
        returnObject: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, context) {

        const handleSelect = (e) => {
            context.emit('menuClick', e)
        }


        return {
            handleSelect
        }
    }
}
</script>

<style>

</style>