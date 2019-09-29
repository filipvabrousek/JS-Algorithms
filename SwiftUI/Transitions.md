## Transitions
```swift
struct Advanceda: View {
    @State var open = false

    var body: some View {
        VStack {

            Button("Open") {
                withAnimation {
                    self.open = true
                }
            }

            if open {
                Rectangle()
                    .fill(Color(0x1abc9c))
                    .frame(width: 120, height: 200)
                //.transition(.slide)
                .transition(.asymmetric(insertion: AnyTransition.opacity.combined(with: .slide), removal: .scale))
            }


        } .gesture(TapGesture().onEnded({ _ in
                withAnimation {
                    self.open = false
                }
            }))
    }
}


extension AnyTransition {
    var sleek: AnyTransition {
        return .slide
    }
}
```
