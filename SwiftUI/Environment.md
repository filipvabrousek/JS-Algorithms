## Environment

```swift
struct ContentView: View {
    @Environment(\.editMode) var editMode

    var body: some View {
        VStack {
            if self.editMode?.wrappedValue == .inactive {
               Text("Inactive")
            }

        }
    }
}

```
