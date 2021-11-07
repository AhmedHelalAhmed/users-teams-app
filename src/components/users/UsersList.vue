<template>
  <button @click='confirmInput'>Confirm</button>
  <ul>
    <user-item
      v-for='user in users'
      :key='user.id'
      :name='user.fullName'
      :role='user.role'
    ></user-item>
  </ul>
</template>

<script>
import UserItem from './UserItem.vue';

export default {
  components: {
    UserItem
  },
  inject: ['users'],
  methods: {
    confirmInput() {
      // do some logic then navigate to some component
      this.$router.push('/teams');
      // this.$router.back();
      // this.$router.forward();
    }
  },
  beforeRouteEnter(to, from, next) {
    // component level
    // called before the navigation confirmed
    console.log('UsersList component beforeRouteEnter', to, from);
    next();
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 20rem;
  padding: 0;
}
</style>
