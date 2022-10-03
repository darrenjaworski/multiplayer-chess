# multiplayer online chess game

## tooling

- git
- node
- visual studio (ide)
- [redux devtools extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
- [react devtools extension](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)

## architecture

- pure web
  - client application
    - react
      - chess.js
      - react-chessboard
  - networking (MP)
    - websockets
  - web server
    - auth0 for authentication

### phased development

- 🟡 a local chess match (local)
  - ✅ render a chess board (design, dev)
  - ✅ render pieces on a board
  - logic for piece movement
  - logic for piece capture
    - display captured pieces in middle above or below board for player
    - handle reintroducing piece to board from pawn
  - logic for game states
    - won/lost, stalemate
    - undo last move
    - reset game
  - number of players setup
    - one player vs computer
    - two players on same browser window
- show history of moves from game
  - show all moves listed out for a game
  - ability to show historical games from start to finish
    - backwards and fowards buttons to go move by move through game
    - play button to animate through game move by move
- chess match against AI
  - computer does random move
  - computer does simplistic algorithm to determine move
- a chess match against another online player
  - api for websockets
  - frontend client can update via websocket server
- a chess matches against any number of players
  - users can sign up
  - users can search for a match
  - users are paired (matchmaking)
- setup infrastructure and code pipeline
  - applications are built and deployed
- setup domain and deploy
  - DNS
- code an advanced AI (convolution neural networks)
  - simplistic alphazero

## session: 9/22

- tooling setup
- basic phaser game to render
- answer any questions

30min/1 hour every week for the next 2 months

## session: 9/27

- render the chessboard next time
- setup vscode:

  - gitbash=default terminal
  - setup default git editor
  - lite tutorial on vscode (navigation and tips)

- homework for ian:
  - [react js docs](https://reactjs.org/docs/getting-started.html)
  - [react-chessboard](https://www.npmjs.com/package/react-chessboard)
  - [create react app](https://github.com/facebook/create-react-app)
  - [git on atlassian](https://www.atlassian.com/git)

## next session

- move the pieces
- show ian 'git stash'
