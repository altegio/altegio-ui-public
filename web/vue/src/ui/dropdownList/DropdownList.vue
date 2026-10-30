<template>
  <alt-core-dropdown-list
    v-bind="props"
    @item-click="$emit('item-click', $event)"
  >
    <div
      v-if="$slots.top && $slots.top()"
      slot="top"
    >
      <slot name="top" />
    </div>

    <div
      v-if="hasItemOrListSlot($slots)"
      slot="list"
    >
      <slot
        name="list"
        :items="items"
        :item-label="itemLabel"
      >
        <template
          v-for="item in items"
          :key="item.id"
        >
          <slot
            :name="`item-outer-${item.id}`"
            :item="item"
            :item-label="itemLabel"
          >
            <slot
              name="item-outer"
              :item="item"
              :item-label="itemLabel"
            >
              <alt-core-dropdown-cell
                :locator="`${AltCoreDropdownCellTagName}_${item.id}`"
              >
                <slot
                  :name="`item-inner-${item.id}`"
                  :item="item"
                  :item-label="itemLabel"
                >
                  <slot
                    name="item-inner"
                    :item="item"
                    :item-label="itemLabel"
                  >
                    {{ item[itemLabel] }}
                  </slot>
                </slot>
              </alt-core-dropdown-cell>
            </slot>
          </slot>
        </template>
      </slot>
    </div>

    <div
      v-if="$slots.bottom && $slots.bottom()"
      slot="bottom"
    >
      <slot name="bottom" />
    </div>
  </alt-core-dropdown-list>
</template>

<script setup lang="ts">
  import '~core/ui/dropdownCell'
  import '~core/ui/dropdownList'
  import {
    createVueDropdownListProps,
    type IAltVueDropdownListProps,
    type IAltVueDropdownListEmits,
    type IAltVueCoreDropdownListProps,
  } from '~vue/ui/dropdownList/models/types'
  import { AltCoreDropdownCellTagName } from '~web/shared/constants'

  interface IListScopedProps {
    items: IAltVueCoreDropdownListProps['items']
    itemLabel: IAltVueCoreDropdownListProps['itemLabel']
  }

  interface IItemScopedProps {
    item: NonNullable<IAltVueCoreDropdownListProps['items']>[number]
    itemLabel: IAltVueCoreDropdownListProps['itemLabel']
  }

  interface ISlots {
    top: () => unknown
    list: (props: IListScopedProps) => unknown
    bottom: () => unknown
    ['item-outer']: (props: IItemScopedProps) => unknown
    ['item-inner']: (props: IItemScopedProps) => unknown
    [key: `item-outer-${string}`]: (props: IItemScopedProps) => unknown
    [key: `item-inner-${string}`]: (props: IItemScopedProps) => unknown
  }

  defineOptions({ name: 'AltDropdownList' })

  defineSlots<Partial<ISlots>>()

  const props = withDefaults(
    defineProps<IAltVueDropdownListProps>(),
    createVueDropdownListProps(),
  ) satisfies IAltVueCoreDropdownListProps

  const hasItemOrListSlot = (slots: Partial<ISlots>) => {
    return Object.keys(slots).some((key) => key.startsWith('item') || key.startsWith('list'))
  }

  defineEmits<IAltVueDropdownListEmits>()
</script>
