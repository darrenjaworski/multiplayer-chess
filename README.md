# multiplayer online chess game

[![client static checks](https://github.com/darrenjaworski/multiplayer-chess/actions/workflows/client-static-checks.yml/badge.svg)](https://github.com/darrenjaworski/multiplayer-chess/actions/workflows/client-static-checks.yml)
[![server static checks](https://github.com/darrenjaworski/multiplayer-chess/actions/workflows/server-static-checks.yml/badge.svg)](https://github.com/darrenjaworski/multiplayer-chess/actions/workflows/server-static-checks.yml)

## tooling

- git
- node (lts/hydrogen)
- visual studio (ide)
  - extensions
    - [prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
    - [jest test runner](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest)
    - [eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [redux devtools extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
- [react devtools extension](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)

## architecture

- pure web
  - client application
    - react
      - chess.js
      - react-chessboard
  - server
    - nest js
      - websockets
      - chess engine
      - auth0 for authentication

### phased development

🟡 means a major phase is in progress

✅ means an item is completed

- ✅ a local chess match (local)
  - ✅ render a chess board (design, dev)
  - ✅ render pieces on a board
  - ✅ render valid moves on hover
  - ✅ logic for piece movement
    - ✅ basic movement
    - ✅ castling
  - ✅ logic for piece capture
    - ✅ display captured pieces in middle above or below board for player
    - ✅ handle promotion
    - ✅ en pessant capture
  - ✅ logic for game states
    - ✅ won/lost, stalemate
      - ✅ display game state
      - ✅ display game move history
      - ✅ display who won
      - ✅ display on player line who is in check mate, both in stalemate, etc
      - ✅ enable player to forfeit match
    - ✅ undo last move
      - ✅ undo when not your turn
      - ✅ 5 second timer to undo your move and before other player
      - ✅ when capture is undone on board, remove from captured pieces
    - ✅ reset game
    - ✅ show player in check
    - ✅ show player's turn
  - ✅ number of players setup
    - ✅ start screen
    - ✅ two players on same browser window
    - ✅ game modes
      - ✅ unlimited time
      - ✅ presets with 5, 10 or 15 min
        - ✅ clock ticks down on player line
        - ✅ handle time run out
- ✅ show history of moves from game
  - ✅ show all moves listed out for a game
  - ✅ show ticker above game that displays pgn
- 🟡 basic design
  - ✅ themes (light, dark)
  - ✅ color palette for board and pieces (3 presets)
  - ✅ board theme switcher
  - 🟡 add sound effects to player piece moves, captures. end game, check, promotion.
  - ✅ mobile friendly
- 🟡 chess match against another online player or computer
  - 🟡 api for websockets
  - api for chess AI
  - frontend client can update via websocket server
- chess match against AI
  - computer does random move
  - computer does simplistic algorithm to determine move
- chess matches against any number of players
  - users can sign up
  - users can search for a match
  - users are paired (matchmaking)
- setup infrastructure and code pipeline
  - applications are built and deployed
- setup domain and deploy
  - DNS
- advanced AI
  - simplistic alphazero

---

## punted features

- board and piece styling
  - board preview to the right
  - style options to the left
    - board background colors
    - custom pieces
    - pieces colors
    - light mode/dark mode
- ability to create a user
  - save/show game history
  - save board style preferences
- ability to show historical games from start to finish
  - backwards and fowards buttons to go move by move through game
  - play button to animate through game move by move
  - timed game, maintain clock from redux timing, not internal state (ability to replay with timing correct)
- mobile first controls, click to select piece, click to select destination, etc
- allow premoves
- style arrows on board for capture
- allow users to swap between board pieces icons
- each move takes a min of 1 sec off clock

---

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
