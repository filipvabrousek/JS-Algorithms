//
//  ContentView.swift
//  BI
//
//  Created by Filip Vabroušek on 25/09/2019.
//  Copyright © 2019 Filip Vabroušek. All rights reserved.
//

import SwiftUI



// https://youtu.be/psL_5RIBqnY?t=7679


class Ref: ObservableObject {
    @Published var ref: Bool = false
}

struct Another: View {
    @EnvironmentObject var ref: Ref
    
    @State var messages = ["Filip", "Hello", "Filip", "Hello", "Filip", "Hello", "Filip", "Hello", "Filip", "Hello", "Filip", "Hello", "Filip", "Hello", "Filip", "Hello", "Filip", "Hello", "Filip" /*"Hello", "Filip", "Hello", "Filip", "Hello", "Filip", "Hello", "Filip", "Hello", "Filip", "Hello", "Filip", "Hello", "Filip", "Hello", "Filip", "Hello", "Filip", "Hello", "Filip", "Hello", "Filip", "Hello"*/]

    var body: some View {
        VStack(alignment: .center) {
            Button("Refresh") {
                self.messages.append("Hey")
                self.ref.ref = true
               // self.messages = ["Poly"]
            }

            Spacer()

            ForEach(self.messages, id: \.self) { m in
                Text(m).bold().padding(20)
            }
        }
    }
}



struct CV: View {

    @State var refresh = false
    @EnvironmentObject var ref: Ref
    
    
    // SwiftScroll Blocks adding elements
    // SwiftScroll Blocks adding elements





    var body: some View {
        SwiftScroll(shouldRefresh: self.$refresh) {
            Another()
            
        }.onAppear {self.refresh = self.ref.ref}
    }
}



struct SwiftScroll<Content: View>: UIViewControllerRepresentable {
    //  @State var shouldRefresh: Bool = false

    //  @Binding var shouldRefresh: Bool
    var shouldRefresh: Binding<Bool>
    var content: () -> Content

    func makeCoordinator() -> Coordinator {
        Coordinator(ref: shouldRefresh, content: content)
    }

    final class Coordinator {
        var shouldRefresh: Binding<Bool>
        var content: () -> Content


        init(ref: Binding<Bool>, @ViewBuilder content: @escaping () -> Content) {
            self.shouldRefresh = ref//.wrappedValue
            self.content = content
        }
    }

    func makeUIViewController(context: UIViewControllerRepresentableContext<SwiftScroll<Content>>) -> UIScrollViewViewController {
        let v = UIScrollViewViewController()
        v.hostingController.rootView = AnyView(/*ScrollView { */self.content() /*}*/)
        return v
    }

    func updateUIViewController(_ viewController: UIScrollViewViewController, context: Context) {

        // if shouldRefresh {
        print("Hey")
        viewController.scroll()
        // }
    }
}




class UIScrollViewViewController: UIViewController {

    lazy var scrollView: UIScrollView = {
        let v = UIScrollView()
        // v.isPagingEnabled = true
        return v
    }()

    func scroll() {
        print("NIW")

        //DispatchQueue.main.asyncAfter(deadline: .now() + 1.0) {
        let bottomOffset = CGPoint(x: 0, y: self.scrollView.contentSize.height - self.scrollView.bounds.size.height)
        self.scrollView.setContentOffset(bottomOffset, animated: true)
        // self.scrollView.setContentOffset(CGPoint(x: 0, y: 400), animated: true)
        // }
    }

    var hostingController: UIHostingController<AnyView> = UIHostingController(rootView: AnyView(EmptyView()))

    override func viewDidLoad() {
        super.viewDidLoad()
        self.view.addSubview(self.scrollView)
        self.pinEdges(of: self.scrollView, to: self.view)

        self.hostingController.willMove(toParent: self)
        self.scrollView.addSubview(self.hostingController.view)
        self.pinEdges(of: self.hostingController.view, to: self.scrollView)
        self.hostingController.didMove(toParent: self)

    }

    func pinEdges(of viewA: UIView, to viewB: UIView) {
        viewA.translatesAutoresizingMaskIntoConstraints = false
        viewB.addConstraints([
            viewA.leadingAnchor.constraint(equalTo: viewB.leadingAnchor),
            viewA.trailingAnchor.constraint(equalTo: viewB.trailingAnchor),
            viewA.topAnchor.constraint(equalTo: viewB.topAnchor),
            viewA.bottomAnchor.constraint(equalTo: viewB.bottomAnchor),
            ])
    }

}

/*
struct CT: View {
    @State var input = ""
    @State var users = ["Hello"]

    var body: some View {
        VStack {
            TextField("Enter", text: $input).padding()

            Button("Add") {
                self.users.append(self.input)
            }

            List(users, id: \.self) { u in
                Text(u).bold()
            }
        }
    }
}




struct ListView: View {
    @State var height = "0.0"
    @State var weight = "0.0"
    @State var place: String = ""

    var body: some View {
        VStack {
            Text(place).bold()

            TextField("Enter Height in cm", text: $height) // height (m)
            TextField("Enter Weight in kg", text: $weight) // weight (kg)

            Button("Hey") {
                self.place = "\(Double(self.height)! / Double(self.weight)! * Double(self.weight)!)" }
        }

        // "\(Int(self.height)! / Int(self.weight)! * Int(self.weight)!)"
    }
    // Enter whole integer
}

*/


struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        CV()
    }
}



