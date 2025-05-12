# Minimal Reproduction of Expo SDK 53 Test Failures Which Pass in SDK 52

There are two test cases in this app, in a single file. Both test cases
run the exact same test. When either test is run individually, they each
pass. When they're run together, the first test passes and causes all
remaining tests to fail.

The test case being reused here taps a button, which makes an API call
that's mocked with nock and then pushes a new screen onto the expo
router's stack.

You can see from the console.log's that subsequent runs of the test case
cause the `await response.json()` line to hang; because no logs are
shown after that line in subsequent test runs.

I'm not sure if this is because RN replaced the old node fetch with a
native fetch, which is what nock is capable of mocking.

I tried adding `yarn add node-fetch@2` and then importing it in the
app/index.tsx screen with `import fetch from "node-fetch"`.

However, I continued to see the same type of successes and failures (an
individual test passes and multiple tests being run together causes all
subsequent tests to fail).

That leads me to believe the problem is elsewhere, in an upgrade to
either react, react-native, expo-router, expo itself, or jest-expo
which all need to be upgraded in lock step with each other, so I'm
unsure how to narrow down the problem from here.

These two tests pass when run together if run in an expo sdk 52 project.

The major changes that's causing this problem (I've found, as a result
of creating this minimal reproducible example), must be caused by one
of the following upgrades:

---

expo (from) 52.0.46 (to) 53.0.9

react (from) 18.3.1 (to) 19.0.0

react-native (from) 0.76.9 (to) 0.79.2

jest-expo (from) 52.0.6 (to) 53.0.5
