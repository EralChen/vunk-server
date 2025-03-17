declare global {
  namespace JSX {
    interface IntrinsicElements {
      [key: string]: any
    }
    export interface IntrinsicAttributes {
      array?: boolean
    }
  }
}

export {}
