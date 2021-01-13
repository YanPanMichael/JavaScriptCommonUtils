interface A {
  aaa: string
}

interface B {
  func(): Promise<A>
}

declare type funcType = () => Promise<A>;

const test = async () => {
  await new Promise(r => this.setState({ sss: 1 }, r));
}