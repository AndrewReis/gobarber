import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        outline: 0;
    }

    body {
        background-color: #312e38;
        color: #fff;
    }

    body, input, button {
        font-family: 'Roboto Slab', serif;
    }

    button {
        cursor: pointer;
    }

`;