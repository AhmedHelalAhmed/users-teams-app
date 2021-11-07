import { createRouter, createWebHistory } from 'vue-router';
import TeamsList from './pages/TeamsList.vue';
import UsersList from './pages/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import NotFound from './pages/NotFound.vue';
import TeamsFooter from './pages/TeamsFooter.vue';
import UsersFooter from './pages/UsersFooter.vue';


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/teams'
    },

    {
      name: 'teams',
      path: '/teams',
      meta: {
        needsAuth: true
      },
      // component: TeamsList,
      components: {
        default: TeamsList,
        footer: TeamsFooter
      },// multi router view
      /* alias: '/' // url does not change redirect is better */
      children: [
        // child route for another root route
        {
          name: 'team-members',
          path: ':teamId',
          component: TeamMembers,
          props: true
        }
      ]
    },
    {
      path: '/users',
      // component: UsersList
      components: {
        default: UsersList,
        footer: UsersFooter
      },
      beforeEnter(to, from, next) {
        // route config level
        // before enter the route
        console.log('users beforeEnter');
        console.log(to, from);
        next();
      }
    },

    {
      path: '/:notFound(.*)',
      component: NotFound
    }
  ],
  linkActiveClass: 'active', // to change active class to active
  scrollBehavior(_, _2, savedPosition) {
    // console.log(to, from, savedPosition);// to =_ , _2 = from
    // when click back go to the position where you were
    if (savedPosition) {
      return savedPosition;
    }
    // when click any link go to the top of the page
    return { left: 0, top: 0 };
  }
});

// guards
router.beforeEach(function(to, from, next) {
  // global level
  console.log('Global beforeEach');
  console.log(to, from);

  if (to.meta.needsAuth) {
    console.log('Needs auth!');
    next();
  } else {
    next();
  }

  // next(false);// cancel the navigation
  // next(true);// allow the navigation by default the true no need to pass it
  // next('/users');
  /*
  if (to.name === 'team-members') {
    next();
  } else {
    next({
      name: 'team-members',
      params: { teamId: 't2' }
    });
  }
   */
});

// run once the navigation confirmed
router.afterEach(function(to, from) {
  // sending analytics data
  // log navigation and when user changes pages
  console.log('Global afterEach');
  console.log(to, from);

});


export default router;