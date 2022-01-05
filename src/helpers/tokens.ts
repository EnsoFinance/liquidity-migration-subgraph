import { BigInt, Address, log } from "@graphprotocol/graph-ts";
import { ERC20 } from "../../generated/LiquidityMigration/ERC20";
import { ERC20SymbolBytes } from "../../generated/LiquidityMigration/ERC20SymbolBytes";
import { ERC20NameBytes } from "../../generated/LiquidityMigration/ERC20NameBytes";

export function getTokenSymbol(address: Address): string {
  let contract = ERC20.bind(address);

  let symbolCall = contract.try_symbol();
  let symbol = "Unknown";

  // standard ERC20 implementation
  if (!symbolCall.reverted) {
    return symbolCall.value;
  }

  // non-standard ERC20 implementation
  let bytesContract = ERC20SymbolBytes.bind(address);

  let symbolBytesCall = bytesContract.try_symbol();
  if (!symbolBytesCall.reverted) {
    return symbolBytesCall.value.toString();
  }

  // warning if both calls fail
  log.warning("symbol() call (string or bytes) reverted for {}", [
    address.toHex(),
  ]);
  return symbol;
}

export function getTokenName(address: Address): string {
  let contract = ERC20.bind(address);

  let nameCall = contract.try_name();
  let name = "Unknown";

  // standard ERC20 implementation
  if (!nameCall.reverted) {
    return nameCall.value;
  }

  // non-standard ERC20 implementation
  let bytesContract = ERC20NameBytes.bind(address);

  let nameBytesCall = bytesContract.try_name();
  if (!nameBytesCall.reverted) {
    return nameBytesCall.value.toString();
  }

  // warning if both calls fail
  log.warning("name() call (string or bytes) reverted for {}", [
    address.toHex(),
  ]);
  return name;
}

export function getTokenDecimals(tokenAddress: Address): BigInt {
  let contract = ERC20.bind(tokenAddress);
  // try types uint8 for decimals
  let decimalValue = null;
  let decimalResult = contract.try_decimals();
  if (!decimalResult.reverted) {
    decimalValue = decimalResult.value;
  }
  return BigInt.fromI32(decimalValue);
}
