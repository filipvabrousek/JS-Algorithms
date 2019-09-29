## Shape


### SidesView
```swift

struct SidesView: View {
    @State var sides = 3.0
    @State var duration = 3.0
    @State var color = Color(0x1abc9c)

    var body: some View {
        VStack {
            Spacer()
            Polygon(sides: self.sides)
                .stroke(lineWidth: 6.0)
                .foregroundColor(color)
                .frame(width: 100, height: 100)
                .animation(.easeInOut(duration: duration))
                .layoutPriority(1.0)
                .transition(.asymmetric(insertion: .slide, removal: .scale))

            Spacer()

            HStack {
                Button("Change sides") {
                    if self.sides == 3 {
                        self.duration = self.animationTime(before: Double(self.sides), after: 13.0)
                        self.sides = 13
                        self.color = Color(0x3498db)
                    } else {
                        self.duration = self.animationTime(before: Double(self.sides), after: 3.0)
                        self.sides = 3
                        self.color = Color(0x1abc9c)
                    }
                }
                    .font(Font.body.bold())
            }

            Spacer()
        }
    }

    func animationTime(before: Double, after: Double) -> Double {
        // Calculate an animation time that is
        // adequate to the number of sides to add/remove.
        return abs(before - after) * (1 / abs(before - after))
    }
}
```

### Polygon
``swift
struct Polygon: Shape {
    var sides: Double

    var animatableData: Double {
        get { return sides }
        set { self.sides = newValue }
    }

    func path(in rect: CGRect) -> Path {
        let h = Double(min(rect.size.width, rect.size.height))

        let c = CGPoint(x: rect.size.width / 2.0, y: rect.size.height / 2.0)

        var path = Path()

        let extra: Int = Double(sides) != Double(Int(sides)) ? 1 : 0

        for i in 0..<Int(sides) + extra {
            let angle = (Double(i) * (360.0 / Double(sides))) * Double.pi / 180

            let pt = CGPoint(x: c.x + CGFloat(cos(angle) * h), y: c.y + CGFloat(sin(angle) * h))

            if i == 0 {
                path.move(to: pt)
            } else {
                path.addLine(to: pt)
            }
        }

        path.closeSubpath()

        return path
    }
}

extension Color {
    init(_ hex: UInt32) {
        let red = Double((hex & 0xff0000) >> 16) / 255.0
        let green = Double((hex & 0xff00) >> 8) / 255.0
        let blue = Double((hex & 0xff) >> 0) / 255.0
        self.init(.sRGB, red: red, green: green, blue: blue)
    }
}

```

SOURCE: 
