//
//  Widget_Large.swift
//  Feuerwehr WidgetExtension
//
//  Created by Thomas Düren on 16.09.22.
//
import WidgetKit
import SwiftUI

struct Feuerwehr_Widget_Large: Widget {
    let kind: String = "Feuerwehr_Widget_Large"

    var body: some WidgetConfiguration {
        IntentConfiguration(kind: kind, intent: ConfigurationIntent.self, provider: Provider()) { entry in
            Feuerwehr_WidgetEntryView(entry: entry)
        }
        .configurationDisplayName("My Widget")
        .description("This is an example widget.")
        .supportedFamilies([.systemLarge])
    }
}

struct Feuerwehr_Widget_Large_Previews: PreviewProvider {
    static var previews: some View {
        Feuerwehr_WidgetEntryView(entry: SimpleEntry(date: Date(), configuration: ConfigurationIntent()))
            .previewContext(WidgetPreviewContext(family: .systemLarge))
    }
}
