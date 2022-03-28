<template>
  <div>
    <page-top title="Random User" :showBottomHr="true">
      <template v-slot:icon>
        <b-icon icon="people" />
      </template>
    </page-top>
    <search-bar
      :fields="searchBarFields"
      :datatable-meta="datatableMeta"
      @onChangeInput="onSearchChange"
      @onSearchClick="onSearchClick"
      :show-clear-btn="true"
      @onClearSearchClick="onClearSearchClick"
    />
    <hr />
    <datatable
      :title="'Random User'"
      :columns="columns"
      :current-page="datatableMeta.page"
      :page-size="datatableMeta.pageSize"
      :sort-order="datatableMeta.sortOrder"
      :sort-by="datatableMeta.sortBy"
      :total-data-count="listTotalCount"
      :data="list"
      :is-fetching="isFetchingList"
      :hideIndex="true"
      @onMetaChange="onDTChange"
    >
      <template v-slot:username="{ row }">
        {{ row.login.username }}
      </template>
      <template v-slot:name="{ row }">
        {{ Object.values(row.name).join(' ') }}
      </template>
      <template v-slot:email="{ row }">
        {{ row.email }}
      </template>
      <template v-slot:gender="{ row }">
        {{ row.gender }}
      </template>
      <template v-slot:nat="{ row }">
        {{ row.nat }}
      </template>
      <template v-slot:registered="{ row }">
        {{ formatDateTime(row.registered.date) }}
      </template>
    </datatable>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Meta, QueryPayload, Columns, SearchBarField } from '@/types/datatable.types';
import PageTop from '@/components/common/PageTop.vue';
import SearchBar from '@/components/common/SearchBar.vue';
import Datatable from '@/components/datatables/Datatable.vue';
import moment from 'moment';
import { generateMeta, parseQueryPayload } from '@/utils/datatable.utils';
import { isValidState, isInvalidState, validateEmail } from '@/utils/form.utils';
import { mapState, mapMutations, mapActions } from 'vuex';

export default Vue.extend({
  name: 'Listings',
  components: {
    PageTop,
    SearchBar,
    Datatable,
  },
  created() {
    (this as any).init();
  },
  mounted() {
    window.document.title = 'Random User | Ajaib Test';
  },
  computed: {
    ...mapState({
      list: (state: any) => state.randomUser.list,
      listTotalCount: (state: any) => state.randomUser.listTotalCount,
      isFetchingList: (state: any) => state.randomUser.isFetchingList,
      datatableMeta: (state: any) => state.randomUser.datatableMeta,
    }),
  },
  data(): {
    columns: Columns;
    searchBarFields: Array<any>;
    isSearchDiff: boolean;
    selectedData: any;
  } {
    return {
      columns: [
        {
          label: 'Username',
          name: 'username',
          sortable: true,
          slot: {
            name: 'username',
          },
        },
        {
          label: 'Name',
          name: 'name',
          sortable: true,
          slot: {
            name: 'name',
          },
        },
        {
          label: 'Email',
          name: 'email',
          sortable: true,
          slot: {
            name: 'email',
          },
        },
        {
          label: 'Gender',
          name: 'gender',
          sortable: true,
          slot: {
            name: 'gender',
          },
        },
        {
          label: 'Nationality',
          name: 'nat',
          sortable: true,
          slot: {
            name: 'nat',
          },
        },
        {
          label: 'Registered Date',
          name: 'registered',
          sortable: true,
          slot: {
            name: 'registered',
          },
        },
      ],
      searchBarFields: [
        {
          label: 'Search',
          name: 'keyword',
          value: null,
          initialValue: null,
        },
        {
          label: 'Gender',
          name: 'gender',
          type: 'select',
          options: [
            {
              label: 'All',
              value: null,
            },
            {
              label: 'Female',
              value: 'female',
            },
            {
              label: 'Male',
              value: 'male',
            },
          ],
          value: null,
          initialValue: null,
        },
        {
          label: 'Nationality',
          name: 'nat',
          type: 'select',
          options: [
            {
              label: 'All',
              value: null,
            },
            {
              label: 'AU',
              value: 'au',
            },
            {
              label: 'BR',
              value: 'br',
            },
            {
              label: 'GB',
              value: 'gb',
            },
            {
              label: 'IE',
              value: 'ie',
            },
            {
              label: 'US',
              value: 'us',
            },
          ],
          value: null,
          initialValue: null,
        },
      ],
      isSearchDiff: false,
      selectedData: {},
    };
  },
  methods: {
    init() {
      const self = this as any;
      self._searchUser({
        params: parseQueryPayload(this.datatableMeta),
      });
    },

    // Datatable methods
    onDTChange(meta: Meta) {
      const self = this as any;
      const newMeta: Meta = meta;
      if (self.isSearchDiff) {
        newMeta.page = 1;
        self.isSearchDiff = false;
      }
      self.SET_DATATABLE_META({
        ...self.datatableMeta,
        ...newMeta,
      });
      self._searchUser({
        params: parseQueryPayload(self.datatableMeta),
      });
    },
    onSearchChange({ name, value, fields, datatableMeta, isSearchDiff }: any) {
      const self = this as any;
      self.isSearchDiff = isSearchDiff;
      self.searchBarFields = fields;
      self.SET_DATATABLE_META(datatableMeta);
    },
    onClearSearchClick({ fields, datatableMeta, isSearchDiff }: any) {
      const self = this as any;
      self.isSearchDiff = isSearchDiff;
      self.searchBarFields = fields;
      self.SET_DATATABLE_META(datatableMeta);
    },
    onSearchClick() {
      const self = this as any;
      self.isSearchDiff = false;
      self.SET_DATATABLE_META({
        ...self.datatableMeta,
        page: 1,
      });
      self._searchUser({
        params: parseQueryPayload(self.datatableMeta),
      });
    },
    // end of Datatable methods
    formatDateTime(value: string) {
      return moment(value).format('YYYY/MM/DD HH:mm');
    },
    formatDate(value: string) {
      return moment(value).format('YYYY/MM/DD');
    },
    isValidState: (params: any) => isValidState(params),
    isInvalidState: (params: any) => isInvalidState(params),
    ...mapMutations({
      SET_IS_LOADING: 'view/SET_IS_LOADING',
      SET_DATATABLE_META: 'randomUser/SET_DATATABLE_META',
    }),
    ...mapActions({
      _searchUser: 'randomUser/searchUser',
    }),
  },
});
</script>
