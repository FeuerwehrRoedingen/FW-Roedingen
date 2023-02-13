//
//  Feuerwehr_Widget.swift
//  Feuerwehr Widget
//
//  Created by Thomas Düren on 16.09.22.
//

import WidgetKit
import SwiftUI
import Intents

// Provider for all Widgets is the same, the returned DataType T differs for every Widget
// and is defined in a Widgets File
struct Provider<T: GenericInit>: IntentTimelineProvider {
    func placeholder(in context: Context) -> Entry<T> {
      Entry(date: Date(), configuration: ConfigurationIntent(), data: T())
    }

    func getSnapshot(for configuration: ConfigurationIntent, in context: Context, completion: @escaping (Entry<T>) -> ()) {
      let entry = Entry(date: Date(), configuration: configuration, data: T())
        completion(entry)
    }

    func getTimeline(for configuration: ConfigurationIntent, in context: Context, completion: @escaping (Timeline<Entry<T>>) -> ()) {
        var entries: [Entry] = []
        // Generate a timeline consisting of five entries an hour apart, starting from the current date.
        let currentDate = Date()
        for hourOffset in 0 ..< 5 {
            let entryDate = Calendar.current.date(byAdding: .minute, value: hourOffset, to: currentDate)!
          let entry = Entry(date: entryDate, configuration: configuration, data: T())
            entries.append(entry)
        }

        let timeline = Timeline(entries: entries, policy: .atEnd)
        completion(timeline)
    }
}

//Protocol to allow construction of sample Data type
protocol GenericInit {
  init()
}

// Data Type for our Timeline
struct Entry<T>: TimelineEntry {
  let date: Date
  let configuration: ConfigurationIntent
  let data: T
}

//Enum to indicate the state of an appointment
enum Accepted {
  case yes
  case no
  case unsure
  case unread
}

// Bundle containing all three Widgets
@main
struct FeuerwehrWidgets: WidgetBundle {
  var body: some Widget {
    Feuerwehr_Widget_Small()
    Feuerwehr_Widget_Medium()
    Feuerwehr_Widget_Large()
  }
}
