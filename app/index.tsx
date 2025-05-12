import { useRouter } from "expo-router"
import { Button, View } from "react-native"

const App = () => {
  const router = useRouter()

  const makeApiRequestAndTransitionRoute = async () => {
    const response = await fetch("https://some.place/api/gmail/authenticate", {
      method: "POST",
      body: JSON.stringify({ code: "code" }),
    })

    console.log(`done making api request`)
    const data = await response.json()
    console.log(`response json: ${JSON.stringify(data)}`)

    router.push("/inbox")
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Button
        title="Sign in with Google"
        onPress={makeApiRequestAndTransitionRoute}
      />
    </View>
  )
}

export default App
