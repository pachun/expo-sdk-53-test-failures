import {
  renderRouter,
  fireEvent,
  screen,
  waitFor,
  act,
} from "expo-router/testing-library"
import { http, HttpResponse } from "msw"
import { setupServer } from "msw/native"

const test = async () => {
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

const server = setupServer(
  http.post(
    "https://some.place/api/gmail/authenticate",
    async ({ request }) => {
      const body = (await request.json()) as { code?: string }
      if (body.code === "code") {
        return HttpResponse.json({ hello: "world" }, { status: 200 })
      }
      return HttpResponse.json({ error: "Invalid code" }, { status: 400 })
    },
  ),
)

describe("the same two tests", () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  it("pass when run individually", async () => {
    await test()
  })

  it("pass when run together", async () => {
    await test()
  })
})
