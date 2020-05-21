import React from "react";
import renderer from "react-test-renderer";
import { IncomeComponent, mapStateToProps } from "./IncomeComponent";
import { RootState } from "../../redux/reducers";
import { EntityStatus } from "../state";
import * as ReactTestUtils from "react-dom/test-utils";
import ReactDOM, { unmountComponentAtNode } from "react-dom";

describe("Income Component", () => {
  describe("mapStateToProps", () => {
    it("should pass incomes and onlyOneEditAllowedPrompt", () => {
      const appState: RootState = {
        incomeSection: {
          formValues: {
            id: "",
            amount: undefined,
            name: "",
            status: EntityStatus.New,
          },
          onlyOneEditAllowedPrompt: false,
          incomes: [
            {
              id: "id1",
              amount: 1000,
              name: "Startbucks",
              status: EntityStatus.Saved,
            },
            {
              id: "id2",
              amount: 100,
              name: "YouTube",
              status: EntityStatus.Saved,
            },
          ],
        },
        categories: [],
        subcategories: [],
      };

      const mappedValues = mapStateToProps(appState);

      expect(mappedValues.incomes).toHaveLength(2);
      expect(mappedValues.onlyOneEditAllowedPrompt).toStrictEqual(false);
    });
  });

  describe("Test display element", () => {
    it("Should render div with warnging when there are 0 incomes", () => {
      const tree = renderer.create(
        <IncomeComponent
          incomes={[]}
          formValues={{
            id: "",
            amount: undefined,
            name: "",
            status: EntityStatus.New,
          }}
          onlyOneEditAllowedPrompt={false}
          addIncome={() => {}}
          editIncome={() => {}}
          deleteIncome={() => {}}
          setIncomeFormValues={() => {}}
          setPromptVisibility={() => {}}
          locale={null}
        />
      );
      const found = tree.root.find(x => x.type === "tbody");
      const divWithInformation = found.find(x => x.type === "div");

      expect(divWithInformation.children[0]).toMatch(
        "At least one income is required"
      );
      expect(tree).toMatchSnapshot();
    });
  });

  describe("Rendered Income Component inside a DOM", () => {
    let container: Element | null = null;
    beforeEach(() => {
      // setup a DOM element as a render target
      container = document.createElement("div");
      document.body.appendChild(container);
    });

    afterEach(() => {
      // cleanup on exiting
      if (container !== null) {
        unmountComponentAtNode(container);
      }
      container?.remove();
      container = null;
    });

    it("can render and update the Income Component", () => {
      // Test first render and componentDidMount
      ReactTestUtils.act(() => {
        ReactDOM.render(
          <IncomeComponent
            incomes={[]}
            formValues={{
              id: "",
              amount: undefined,
              name: "",
              status: EntityStatus.New,
            }}
            onlyOneEditAllowedPrompt={false}
            addIncome={() => {}}
            editIncome={() => {}}
            deleteIncome={() => {}}
            setIncomeFormValues={() => {}}
            setPromptVisibility={() => {}}
            locale={null}
          />,
          container
        );
      });
      const div = container?.querySelector("div.alert-danger");
      expect(div?.textContent).toBe("At least one income is required");

      expect(div?.getAttribute("role")).toBe("alert");
    });
  });
});
