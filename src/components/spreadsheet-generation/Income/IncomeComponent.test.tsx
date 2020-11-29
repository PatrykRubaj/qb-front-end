import React from "react";
import renderer from "react-test-renderer";
import { IncomeComponent, mapStateToProps } from "./IncomeComponent";
import { RootState } from "../../../redux/reducers";
import { EntityStatus, Income, Country } from "../../../redux/state";
import * as ReactTestUtils from "react-dom/test-utils";
import ReactDOM, { unmountComponentAtNode } from "react-dom";

describe("Income Component", () => {
  describe("mapStateToProps", () => {
    it("should pass incomes and onlyOneEditAllowedPrompt", () => {
      const appState: RootState = {
        country: null,
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
        categoriesSection: {
          categories: [],
          formValues: {
            id: "",
            name: "",
            status: EntityStatus.New,
          },
          onlyOneEditAllowedPrompt: false,
        },
        subcategorySection: {
          subcategories: [],
          formValues: {
            id: "",
            amount: null,
            categoryId: "",
            name: "",
            status: EntityStatus.New,
          },
          onlyOneEditAllowedPrompt: false,
        },
        userSection: {
          isLoading: false,
          user: {
            accessToken: "",
            email: "",
            emailVerified: false,
            givenName: "",
            idToken: "",
            imageUrl: "",
            expiresAt: 0,
          },
          agreedToNewsletter: false,
          agreedToPrivacyPolicy: false,
          showNewsletterPrompt: false,
          redirectUrl: "",
        },
        budgetSection: {
          response: null,
        },
        month: 1,
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
          moveElement={() => {}}
          locale={null}
        />
      );
      const found = tree.root.find((x) => x.type === "tbody");
      const divWithInformation = found.find((x) => x.type === "div");

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

    it("can render the Income Component", () => {
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
            moveElement={() => {}}
            locale={null}
          />,
          container
        );
      });
      const div = container?.querySelector("div.alert-danger");
      expect(div?.textContent).toBe("At least one income is required");

      expect(div?.getAttribute("role")).toBe("alert");
    });

    it("Given 3 incomes in the array, 3 rows should be rendered with correct names and amounts", () => {
      const incomes: Income[] = [
        {
          id: "income1",
          amount: 100,
          name: "Income 1",
          status: EntityStatus.Saved,
        },
        {
          id: "income2",
          amount: 200,
          name: "Income 2",
          status: EntityStatus.Saved,
        },
        {
          id: "income3",
          amount: 300,
          name: "Income 3",
          status: EntityStatus.Saved,
        },
      ];

      ReactTestUtils.act(() => {
        ReactDOM.render(
          <IncomeComponent
            incomes={incomes}
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
            moveElement={() => {}}
            locale={null}
          />,
          container
        );
      });

      const rows = container?.querySelectorAll("tr td");

      //For TypeScript
      if (rows === undefined) {
        fail("There are no rows");
      }

      expect(rows).toBeDefined();
      expect(rows[0].textContent).toBe("Income 1");
      expect(rows[3].textContent).toBe("Income 2");
      expect(rows[6].textContent).toBe("Income 3");

      expect(rows[1].textContent).toBe("$100.00");
      expect(rows[4].textContent).toBe("$200.00");
      expect(rows[7].textContent).toBe("$300.00");
    });

    it("Should format amount in PLN if locale is set to PL, eg. 1500,00 zł", () => {
      const incomes: Income[] = [
        {
          id: "income1",
          amount: 100,
          name: "Income 1",
          status: EntityStatus.Saved,
        },
        {
          id: "income2",
          amount: 3000,
          name: "Income 2",
          status: EntityStatus.Saved,
        },
      ];

      const country: Country = {
        key: "PL",
        name: "PLN - Poland",
        currency: "PLN",
        emojiU: "U+1F1F5 U+1F1F1",
        language: "pl",
      };

      ReactTestUtils.act(() => {
        ReactDOM.render(
          <IncomeComponent
            incomes={incomes}
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
            moveElement={() => {}}
            locale={country}
          />,
          container
        );
      });

      const rows = container?.querySelectorAll("tr td");

      //For TypeScript
      if (rows === undefined) {
        fail("There are no rows");
      }

      expect(rows).toBeDefined();
      expect(rows[1].textContent).toEqual("100,00\xa0zł");
      expect(rows[4].textContent).toEqual("3000,00\xa0zł");
    });

    it("Should format amount in USD if locale set to null", () => {
      const incomes: Income[] = [
        {
          id: "income1",
          amount: 100,
          name: "Income 1",
          status: EntityStatus.Saved,
        },
        {
          id: "income2",
          amount: 3000,
          name: "Income 2",
          status: EntityStatus.Saved,
        },
      ];

      const locale = null;

      ReactTestUtils.act(() => {
        ReactDOM.render(
          <IncomeComponent
            incomes={incomes}
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
            moveElement={() => {}}
            locale={locale}
          />,
          container
        );
      });

      const rows = container?.querySelectorAll("tr td");

      //For TypeScript
      if (rows === undefined) {
        fail("There are no rows");
      }

      expect(rows).toBeDefined();
      expect(rows[1].textContent).toEqual("$100.00");
      expect(rows[4].textContent).toEqual("$3,000.00");
    });

    it("After clicking edit button once, I should see that it was in fact clicked with income passed if form passes validation", async () => {
      const incomes: Income[] = [
        {
          id: "income1",
          amount: 100,
          name: "Income 1",
          status: EntityStatus.Saved,
        },
        {
          id: "income2",
          amount: 100,
          name: "Income 2",
          status: EntityStatus.Editing,
        },
      ];
      const editIncome = jest.fn().mockImplementation((income: Income) => {
        return income;
      });
      const addIncome = jest.fn().mockImplementation((income: Income) => {
        return income;
      });

      ReactTestUtils.act(() => {
        ReactDOM.render(
          <IncomeComponent
            incomes={incomes}
            formValues={{
              id: "income2",
              amount: 100,
              name: "Income 2",
              status: EntityStatus.Editing,
            }}
            onlyOneEditAllowedPrompt={false}
            addIncome={addIncome}
            editIncome={editIncome}
            deleteIncome={() => {}}
            setIncomeFormValues={() => {}}
            setPromptVisibility={() => {}}
            moveElement={() => {}}
            locale={null}
          />,
          container
        );
      });

      const buttons = container?.querySelectorAll("div.form-row button");
      expect(buttons).toBeDefined();
      expect(buttons).toHaveLength(1);
      //For TypeScript
      if (buttons === undefined) {
        fail("There are no rows");
      }

      await ReactTestUtils.act(async () => {
        buttons[0].dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });
      expect(addIncome).toHaveBeenCalledTimes(0);
      expect(editIncome).toHaveBeenCalledTimes(1); // because event didn't finish, use act() to simulate browser
      expect(editIncome).toHaveReturnedWith<Income>({
        ...incomes[1],
        status: EntityStatus.Saved,
      });
    });

    it("Shouldn't fire editAction after clicking edit button when status is EntityStatus.Editing", () => {
      const incomes: Income[] = [
        {
          id: "income1",
          amount: 100,
          name: "Income 1",
          status: EntityStatus.Editing,
        },
        {
          id: "income2",
          amount: 200,
          name: "Income 2",
          status: EntityStatus.Saved,
        },
        {
          id: "income3",
          amount: 300,
          name: "Income 3",
          status: EntityStatus.Saved,
        },
      ];
      const editAction = jest.fn();

      ReactTestUtils.act(() => {
        ReactDOM.render(
          <IncomeComponent
            incomes={incomes}
            formValues={{
              id: "",
              amount: undefined,
              name: "",
              status: EntityStatus.New,
            }}
            onlyOneEditAllowedPrompt={false}
            addIncome={() => {}}
            editIncome={editAction}
            deleteIncome={() => {}}
            setIncomeFormValues={() => {}}
            setPromptVisibility={() => {}}
            moveElement={() => {}}
            locale={null}
          />,
          container
        );
      });

      const buttons = container?.querySelectorAll("td button");

      expect(buttons).toBeDefined();
      expect(buttons).toHaveLength(6);
      //For TypeScript
      if (buttons === undefined) {
        fail("There are no buttons");
      }

      buttons[0].dispatchEvent(new MouseEvent("click", { bubbles: true }));
      expect(editAction).toBeCalledTimes(0);
    });
  });
});
