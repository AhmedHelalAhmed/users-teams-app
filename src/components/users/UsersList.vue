<template>
  <button @click='confirmInput'>Confirm</button>
  <button @click='saveChanges'>Save changes</button>
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
  data() {
    return { changeSaved: false };
  },
  methods: {
    confirmInput() {
      // do some logic then navigate to some component
      this.$router.push('/teams');
      // this.$router.back();
      // this.$router.forward();
    },
    saveChanges() {
      this.changeSaved = true;
    }
  },
  beforeRouteEnter(to, from, next) {
    // component level
    // called before the navigation confirmed
    console.log('UsersList component beforeRouteEnter', to, from);
    next();
  },
  unmounted() {
    // this runs after the navigation confirmed
    console.log('unmounted');
  },
  beforeRouteLeave(to, from, next) {
    // this have the high priority
    console.log('UsersList component beforeRouteLeave');
    console.log(to, from);
    if (this.changeSaved) {
      next();
    } else {
      const userWantsToLeave = confirm('Are you sure? You got unsaved changes!');
      next(userWantsToLeave);
    }
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
