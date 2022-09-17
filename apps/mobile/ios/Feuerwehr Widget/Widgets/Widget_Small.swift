//
//  Widget_Small.swift
//  Feuerwehr WidgetExtension
//
//  Created by Thomas Düren on 16.09.22.
//
import WidgetKit
import SwiftUI

// Data Type the server will provide
struct BasicData: GenericInit{
  let nextMeet: Date
  let nextEvent: Date
  let meetAccept: Accepted = .unread
  let eventAccepted: Accepted = .unread
  
  init() {
    let tmpDate = Date()
    nextMeet = Calendar.current.date(byAdding: .hour, value: 5, to: tmpDate)!
    nextEvent = Calendar.current.date(byAdding: .day, value: 5, to: tmpDate)!
  }
}

// Construct a View from an Entry
private struct EntryView<T: GenericInit> : View {
    var entry: Provider<T>.Entry

    var body: some View {
        Text(entry.date, style: .time)
    }
}

// Widget itself
// @main
struct Feuerwehr_Widget_Small: Widget {
    let kind: String = "Feuerwehr_Widget_Small"

    var body: some WidgetConfiguration {
        IntentConfiguration(kind: kind, intent: ConfigurationIntent.self, provider: Provider<BasicData>()) {
          entry in
            EntryView(entry: entry)
        }
        .configurationDisplayName("My Widget")
        .description("This is an example widget.")
        .supportedFamilies([.systemSmall])
    }
}

// Editing Preview
struct Feuerwehr_Widget_Small_Previews: PreviewProvider {
    static var previews: some View {
      EntryView(entry: Entry(date: Date(), configuration: ConfigurationIntent(), data: BasicData()))
            .previewContext(WidgetPreviewContext(family: .systemSmall))
    }
}