## Circle Animation
* 28.9.2019

```swift

struct AnimationView: View {
    @State var show = true
    @State var to: CGFloat = 0
    @State var progress: CGFloat = 0.0

    var body: some View {
        VStack {

            if show == true {
                Spacer()

                ZStack(alignment: .center) {
                    Circle()
                        .trim(from: 0, to: progress)
                        .stroke(Color(0x3498db), style: StrokeStyle(lineWidth: 30, lineCap: CGLineCap.round))
                        .frame(width: 230, height: 230)


                    Circle()
                        .trim(from: 0, to: progress / 1.5)
                        .stroke(Color(0xf1c40f), style: StrokeStyle(lineWidth: 30, lineCap: CGLineCap.round))
                        .frame(width: 230, height: 230)

                    Circle()
                        .trim(from: 0, to: progress / 3.0)
                        .stroke(Color(0x2ecc71), style: StrokeStyle(lineWidth: 30, lineCap: CGLineCap.round))
                        .frame(width: 230, height: 230)
                }

            }

            Spacer()

            Slider(value: $progress).padding([.leading, .trailing], 20)
            Spacer()
        }
    }
}



```
