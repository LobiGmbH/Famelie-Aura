# Famelie-Aura
# Famelie-Aura

Famelie Aura ist ein interaktives MVP-Dashboard für eine Kinderschutz-App im Stil von Qustodio oder FamiSafe. Das Frontend ist komplett funktionsfähig (lokal im Browser), speichert Daten in `localStorage` und erlaubt das Erstellen, Aktivieren und Verwalten von Profilen und Regeln.

## Lokales Preview

```bash
python3 -m http.server 8000
```

Öffne anschließend <http://localhost:8000> im Browser.

## Funktionen (MVP)

- Profile anlegen/entfernen inkl. Tageslimit
- Regeln hinzufügen und aktivieren/deaktivieren
- Schnellaktionen toggeln (z. B. Notfallmodus, Geo-Tracking)
- Live-Insights aktualisieren
- Alle Daten bleiben lokal im Browser gespeichert

## Hinweise

Dieses Repository ist ein UI-Prototyp ohne Backend. Für echte Schutzfunktionen sind APIs für Content-Filter, Zeitlimits, Geofencing und Benachrichtigungen nötig.
