# synapse
### takehome challenge

To get started, download or clone this repo.

make sure to run
    
    npm install
    
from the root directory, /Server, and /Frontened to download all the dependencies.

To run the backend server, from the server directory, run
    
    npm start

To run the frontend, from the frontend directory, run 
    
    npm start
    

### packages used:

#### frontend
- create-react-app - frontend template
- redux - manage application state
- styled-components - for styling management
- immer - structural sharing for reducers
- reselect - memoization for state selectors


#### backend
- express - runs the backend
- jsonwebtoken - creates a token with username and userid after login/register
- bcrypt - for hasing user passwords
