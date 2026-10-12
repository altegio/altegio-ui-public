<template>
  <y-core-dropdown-list
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
              <y-core-dropdown-cell
                :locator="`${YCoreDropdownCellTagName}_${item.id}`"
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
              </y-core-dropdown-cell>
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
  </y-core-dropdown-list>
</template>

<script setup lang="ts">
  import '~core/ui/dropdownCell'
  import '~core/ui/dropdownList'
  import {
    createVueDropdownListProps,
    type IYVueDropdownListProps,
    type IYVueDropdownListEmits,
    type IYVueCoreDropdownListProps,
  } from '~vue/ui/dropdownList/models/types'
  import { YCoreDropdownCellTagName } from '~web/shared/constants'

  interface IListScopedProps {
    items: IYVueCoreDropdownListProps['items']
    itemLabel: IYVueCoreDropdownListProps['itemLabel']
  }

  interface IItemScopedProps {
    item: NonNullable<IYVueCoreDropdownListProps['items']>[number]
    itemLabel: IYVueCoreDropdownListProps['itemLabel']
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

  defineOptions({ name: 'YDropdownList' })

  defineSlots<Partial<ISlots>>()

  const props = withDefaults(
    defineProps<IYVueDropdownListProps>(),
    createVueDropdownListProps(),
  ) satisfies IYVueCoreDropdownListProps

  const hasItemOrListSlot = (slots: Partial<ISlots>) => {
    return Object.keys(slots).some((key) => key.startsWith('item') || key.startsWith('list'))
  }

  defineEmits<IYVueDropdownListEmits>()
</script>
