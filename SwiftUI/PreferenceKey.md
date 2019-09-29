## PreferenceKey

```swift

struct Key: PreferenceKey {
    typealias Value = [PrefData]
    static var defaultValue: [PrefData] = []

    static func reduce(value: inout [PrefData], nextValue: () -> [PrefData]) {
        value.append(contentsOf: nextValue())
    }
}

struct PrefData: Equatable {
    let idx: Int
    let rect: CGRect
}


struct Advanced: View {
    @State var active: Int = 0
    @State var rects: [CGRect] = Array<CGRect>(repeating: CGRect(), count: 12)

    var body: some View {
        ZStack(alignment: .topLeading) {
            RoundedRectangle(cornerRadius: 12.0)
                .stroke(lineWidth: 3.0)
                .frame(width: rects[active].size.width, height: rects[active].size.height)
                .offset(x: rects[active].minX, y: rects[active].minY)
                .animation(.easeInOut(duration: 1.0))

            VStack(spacing: 20) {
                Small(active: $active, idx: 0)
                Small(active: $active, idx: 1)
                Small(active: $active, idx: 2)
            }
        }.frame(height: 200)
            .onPreferenceChange(Key.self) { pref in
                for p in pref {
                    self.rects[p.idx] = p.rect
                }
            }
            .coordinateSpace(name: "MyStack")
    }
}

struct Small: View {
    @Binding var active: Int
    let idx: Int

    var body: some View {
        Text("Hey")
            .bold()
            .padding(10)
            .background(MovingBorder(idx: idx))
            .onTapGesture {
                self.active = self.idx
        }
    }
}

struct MovingBorder: View {
    let idx: Int

    var body: some View {
        GeometryReader { g in
            Rectangle()
                .fill(Color.clear)
                .preference(key: Key.self, value: [PrefData(idx: self.idx, rect: g.frame(in: .named("MyStack")))])
        }
    }
}
```
