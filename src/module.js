import { createModule } from 'redux-modules';
import { fromJS, List } from 'immutable';
import store from './store';

import { 
  name,
  occupation,
  location,
  company,
  githubUserName,
  linkedinUserName,
  web,
  email
 } from './data';

// STEP2: add your corresponsing function inside actions object
const actions = {
// you can use all the transformation defined in module way below. Make sure to pass it into store.dispatch
  parseCommand: (cmd) => {
      if(commands[cmd] !== undefined) {
        commands[cmd]();
      }else{
        store.dispatch(module.actions.addHistory('Error: command not found. Type `help` for help'));
      }
  },

  openLink: (cmd,link) => {
    
    return () => {
      store.dispatch(module.actions.addHistory(cmd));
      window ? window.open(link, '_blank') : '';
    }
  },


  clearHistory : () => {
    store.dispatch(module.actions.clearHistory());
  },


  showHelp: () => {
    store.dispatch(module.actions.addHistory('help'));
    store.dispatch(module.actions.addHistory('help - this help text'));
    store.dispatch(module.actions.addHistory("github - view my github profile"));
    store.dispatch(module.actions.addHistory("source - browse the code for this page"));
    store.dispatch(module.actions.addHistory("intro - print intro message"));
    store.dispatch(module.actions.addHistory("web - visit my website"));
    store.dispatch(module.actions.addHistory("clear - clear screen"));
    store.dispatch(module.actions.addHistory("linkedin - view my linkedin profile"));
    store.dispatch(module.actions.addHistory("contact - email me"));
  },

  showIntro: () => {
    store.dispatch(module.actions.addHistory(`intro`));
    store.dispatch(module.actions.addHistory(`Hello, I'm ${name}, a ${occupation} currently working in ${company} in the beautiful ${location}`));
    store.dispatch(module.actions.addHistory(`Type 'help' to see what all commands are available`));
  },


}

// STEP1: if you want to add new commands - make an entry here and add the corresponding function is defined in actions object
const commands = {
  'clear'   : actions.clearHistory,
  'help'    : actions.showHelp,
  'intro'   : actions.showIntro,
  'source'  : actions.openLink(`source`,'https://github.com/joelbandi/terminal-about-me'),
  'github'  : actions.openLink(`github`,`http://github.com/${githubUserName}`),
  'web'     : actions.openLink(`web`,`${web}`),
  'linkedin': actions.openLink(`linkedin`,`http://www.linkedin.com/in/${linkedinUserName}`),
  'contact' : actions.openLink(`contact`,`mailto:${email}`),
}

const module = createModule({
  name: 'Terminal',
  selector: state => state,
  initialState: fromJS({
    history: [],
    prompt: '$',
  }),
  transformations: {
    addHistory: {
      reducer: (state, { payload }) => {
        return state.update('history',(history) => history.push(payload));
      },
    },
    clearHistory: {
      reducer: (state) => {
        return state.update('history',(history) => List())
      }
    },
  },
});

export default {
  ...module,
  parseCommand: actions.parseCommand
};