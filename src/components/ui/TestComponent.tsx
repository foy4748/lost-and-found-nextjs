import { type ReactElement } from "react";

export interface TestComponentProps {}

export function TestComponent(props: TestComponentProps): ReactElement {
  return (
    <>
      <section className="Test">
        <p>{JSON.stringify(props)}</p>
      </section>
    </>
  );
}
