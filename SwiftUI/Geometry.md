## GeometryEffect

```swift
struct Skew: GeometryEffect {
    var offset: CGFloat
    var skew: CGFloat
    
    
    var animatableData: AnimatablePair<CGFloat, CGFloat> {
        get { AnimatablePair(offset, skew) }

        set {
            offset = newValue.first
            skew = newValue.second
        }
    }

    func effectValue(size: CGSize) -> ProjectionTransform {
        return ProjectionTransform(CGAffineTransform(a: 1, b: 0, c: skew, d: 1, tx: offset, ty: 0))
    }
}
```

## GeometryReader
## GeometryProxy
```swift
struct BarView: View {
    @State var value: CGFloat = 0.0

    var body: some View {
        GeometryReader { g in
            VStack(alignment: .trailing) {
                Text("Progress: \(self.value)").padding()

                ZStack(alignment: .leading) {
                    Rectangle().opacity(0.1).clipShape(RoundedRectangle(cornerRadius: 6.0))
                    Rectangle().frame(minWidth: 0, idealWidth: self.getWidth(proxy: g),
                        maxWidth: self.getWidth(proxy: g))
                        .background(Color(0x1abc9c)) // After clip shape
                    .clipShape(RoundedRectangle(cornerRadius: 6.0))

                }.frame(height: 10)

            }.frame(height: 10)
                .padding([.leading, .trailing], 10)
        }
    }
    
    func getWidth(proxy: GeometryProxy) -> CGFloat {
        let frame = proxy.frame(in: .global)
        return frame.size.width * value
    }
}
```
