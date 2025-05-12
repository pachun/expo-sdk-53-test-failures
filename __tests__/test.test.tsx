import {
  renderRouter,
  fireEvent,
  screen,
  waitFor,
  act,
} from "expo-router/testing-library"
import nock from "nock"

const test = async () => {
  nock("https://some.place")
    .post("/api/gmail/authenticate", { code: "code" })
    .reply(200, { hello: "world" })

  renderRouter("app", { initialUrl: "/" })

  await waitFor(() => {
    expect(screen.getAllByText("Sign in with Google").length).toBeGreaterThan(0)
  })

  await act(async () => {
    fireEvent.press(await screen.getByText("Sign in with Google"))
  })

  await waitFor(() => {
    expect(screen).toHavePathname("/inbox")
  })
}

describe("the same two tests", () => {
  it("pass when run individually", async () => {
    await test()
  })

  it("pass when run together", async () => {
    await test()
  })
})
