import {
	metafield_json_object_simple,
	metafield_json_object_one_level_nesting,
	metafield_json_object_two_level_nesting,
	metafield_json_object_simple_with_int,
	metafield_json_object_simple_with_boolean,
} from "./test-data/test-data.js"
import { describe, it, expect } from "vitest"
import { serializeEscapedJsonMetafield } from "./serializeEscapedJsonMetafield.js"

describe("serializeEscapedJsonMetafield", () => {
	const metafield_json_object_simple_expected = metafield_json_object_simple
	const metafield_json_object_simple_with_int_expected =
		metafield_json_object_simple_with_int
	const metafield_json_object_simple_with_boolean_expected =
		metafield_json_object_simple_with_boolean
	const metafield_json_object_one_level_nesting_expected =
		metafield_json_object_one_level_nesting
	const metafield_json_object_two_level_nesting_expected =
		metafield_json_object_two_level_nesting

	it("should return a properly formatted JSON string for the corresponding input object", () => {
		expect(
			serializeEscapedJsonMetafield(metafield_json_object_simple_expected)
		).toBe('{""key"":"""&A2:A&""",""keyTwo"":"""&A2:A&"""}')

		expect(
			serializeEscapedJsonMetafield(
				metafield_json_object_one_level_nesting_expected
			)
		).toBe('{""pricebooks"":{""key"":"""&A2:A&""",""keyTwo"":"""&A2:A&"""}}')

		expect(
			serializeEscapedJsonMetafield(
				metafield_json_object_two_level_nesting_expected
			)
		).toBe(
			'{""pricebooks"":{""eu"":{""EUR.price"":"""&A2:A&""",""SEK.price"":"""&A2:A&""",""GBP.price"":"""&A2:A&""",""PLN.price"":"""&A2:A&""",""EUR.nprice"":"""&A2:A&""",""SEK.nprice"":"""&A2:A&""",""GBP.nprice"":"""&<string GBP.nprice>&""",""PLN.nprice"":"""&A2:A&""",""CHF.price"":"""&A2:A&""",""CHF.nprice"":"""&A2:A&""",""NOK.price"":"""&A2:A&""",""NOK.nprice"":"""&A2:A&""",""JPY.price"":"""&A2:A&""",""JPY.nprice"":"""&A2:A&""",""DKK.price"":"""&A2:A&""",""DKK.nprice"":"""&A2:A&""",""CZK.price"":"""&A2:A&""",""CZK.nprice"":"""&A2:A&"""},""na"":{""USD.price"":"""&A2:A&""",""USD.nprice"":"""&A2:A&""",""CAD.price"":"""&A2:A&""",""CAD.nprice"":"""&A2:A&"""},""apac"":{""AUD.price"":"""&A2:A&""",""AUD.nprice"":"""&A2:A&""",""NZD.price"":"""&<string NZD.price>&""",""NZD.nprice"":"""&A2:A&"""}},""misc"":{""global.harmonized_system_code"":"""&<string global.harmonized>&"""}}'
		)
	})

	it("should return an properly formatted JSON string even if the input object includes a non-string value", () => {
		expect(
			serializeEscapedJsonMetafield(
				metafield_json_object_simple_with_int_expected
			)
		).toBe('{""key"":"""&A2:A&""",""keyTwo"":"""&123456&"""}')

		expect(
			serializeEscapedJsonMetafield(
				metafield_json_object_simple_with_boolean_expected
			)
		).toBe('{""key"":"""&A2:A&""",""keyTwo"":"""&true&"""}')
	})

	it("should return an empty string for non-object inputs", () => {
		// @ts-ignore
		expect(serializeEscapedJsonMetafield()).toBe("{}")
	})
})
