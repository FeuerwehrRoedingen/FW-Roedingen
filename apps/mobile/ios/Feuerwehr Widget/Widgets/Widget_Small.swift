//
//  Widget_Small.swift
//  Feuerwehr WidgetExtension
//
//  Created by Thomas Düren on 16.09.22.
//
import WidgetKit
import SwiftUI

struct Feuerwehr_Widget_Small: Widget {
    let kind: String = "Feuerwehr_Widget_Small"

    var body: some WidgetConfiguration {
        IntentConfiguration(kind: kind, intent: ConfigurationIntent.self, provider: Provider()) { entry in
            Feuerwehr_WidgetEntryView(entry: entry)
        }
        .configurationDisplayName("My Widget")
        .description("This is an example widget.")
        .supportedFamilies([.systemSmall])
    }
}

struct Feuerwehr_Widget_Small_Previews: PreviewProvider {
    static var previews: some View {
        Feuerwehr_WidgetEntryView(entry: SimpleEntry(date: Date(), configuration: ConfigurationIntent()))
            .previewContext(WidgetPreviewContext(family: .systemSmall))
    }
}
