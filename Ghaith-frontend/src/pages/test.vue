<!-- <template>
  <v-container class="pa-4 text-center">
    <v-row
      align="center"
      class="fill-height"
      justify="center"
    >
      <template v-for="(item, i) in items" :key="i">
        <v-col
          cols="12"
          md="4"
        >
          <v-hover v-slot="{ isHovering, props }">
            <v-card
              :class="{ 'on-hover': isHovering }"
              :elevation="isHovering ? 12 : 2"
              v-bind="props"
            >
              <v-img
                :src="item.img"
                height="225px"
                cover
              >
                <div class="align-self-center">
                  <v-btn
                    v-for="(icon, index) in icons"
                    :key="index"
                    :class="{ 'show-btns': isHovering }"
                    :color="transparent"
                    :icon="icon"
                    variant="text"
                  ></v-btn>
                </div>
              </v-img>
            </v-card>
          </v-hover>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template> -->
