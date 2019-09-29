## Alignment Guide

```swift
struct Advanced: View {
    var body: some View {
        HStack(alignment: .lastTextBaseline) {
            Text("Delicious")
            Image("avocado").frame(width: 30, height: 30).aspectRatio(contentMode: .fit)
                .alignmentGuide(.lastTextBaseline) {d in d[.bottom] * 3.0} // 3 times the distance from bottom
              
            Text("4 you!")
        }.padding([.leading, .trailing], 20)
    }
}
```
