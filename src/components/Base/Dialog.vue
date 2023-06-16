<template>
  <div>
    <v-dialog
      v-model="dialog"
      transition="dialog-bottom-transition"
      :max-width="maxWidth"
      v-bind="$attrs"
    >
      <v-card :class="className" class="pa-3">  
        <div class="relative">
          <div class="absolute" style="right: 0; top: 15px">
            <v-btn variant="text" icon color="red lighten-2" @click="close">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </div>
        <slot></slot>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: {
    className: {
      type: String,
      default: ''
    },
    maxWidth: {
      type: Number,
      default: 800
    }
  },
  data() {
    return {
      dialog: false
    }
  },
  methods: {
    open() {
      this.dialog = true
    },
    close() {
      this.dialog = false
    }
  }
}
</script>
<style lang="scss" scoped>
.theme--light {
  .v-dialog {
    .v-card {
      background-color: #f8f8f8 !important;
    }
  }
}

.absolute {
  position: absolute;
}

.relative {
  position: relative;
}

.right-0 {
  right: 0;
}
</style>
